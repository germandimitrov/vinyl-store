import authServices from './authService';

class requestServices {
  constructor() {
    this.domain = 'http://localhost:5001/';
    this.headers =  {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  setToken(headers) {
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  }

  getHeaders() {
    return this.headers;
  }

  async get(endpoint) {
    return await this.sendRequest(this.domain + endpoint, 'GET', this.headers, undefined);
  }

  async post(endpoint, headers, payload) {
    return await this.sendRequest(this.domain + endpoint, 'POST', this.headers, payload);
  }

  async put(endpoint, headers, payload) {
    return await this.sendRequest(this.domain + endpoint, 'PUT', this.headers, payload);
  }

  async sendRequest(url, method, headers, payload) {
    try {
      this.setToken(headers);
      let rawResponse = await fetch(url, {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined
      });
      let response = await rawResponse.json();

      if (response.error && response.error.name.includes('TokenExpiredError')) {
        authServices.clearSession();
      }

      return response;
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default new requestServices();

