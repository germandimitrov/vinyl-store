import authServices from './authService';

class requestServices {
  constructor() {
    this.domain = 'http://localhost:5001/';
    this.headers =  {
      'Content-Type': 'application/json'
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

  async post(endpoint, payload = {}) {
    return await this.sendRequest(this.domain + endpoint, 'POST', this.headers, payload);
  }

  async put(endpoint, payload = {}) {
    return await this.sendRequest(this.domain + endpoint, 'PUT', this.headers, payload);
  }

  async delete(endpoint, payload = {}) {
    return await this.sendRequest(this.domain + endpoint, 'DELETE', this.headers, payload);
  }

  async sendRequest(url, method, headers, payload) {
    try {
      this.setToken(headers);
      let rawResponse = await fetch(url, {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined
      });

      // if (!rawResponse.ok) {
      //   throw new Error('Something went wrong!');
      // }

      let response = await rawResponse.json();

      if (response.error && response.error.name.includes('TokenExpiredError')) {
        authServices.clearSession();
      }

      return response;
    }
    catch (error) {
      console.log('Exception!');
      console.log(error);
    }
  }
}

export default new requestServices();

