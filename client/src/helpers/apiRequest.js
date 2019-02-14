class apiRequest {
  constructor() {
    this.url = 'http://localhost:5001'
  }

  async get() {
    try {
      let response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

}

export default new apiRequest();

