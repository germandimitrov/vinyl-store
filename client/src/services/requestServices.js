class requestServices {
  constructor() {
    this.domain = 'http://localhost:5001';
    this.headers =  {
      'Content-Type': 'application/json',
    }
  }

  async get() {
    return await this.sendRequest(this.domain, 'GET', this.headers, undefined);
  }

  async post(url, headers, payload) {
    return await this.sendRequest(this.domain + url, 'POST', this.headers, payload)
  }

  async sendRequest(url, method, headers, payload) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined
      })
      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default new requestServices();

