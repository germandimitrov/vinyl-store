
class authServices {
  authenticate(token, user) {
    user = user || null;
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
    if (user) {
      localStorage.setItem('user', user.id)
    }
  }

  isAuth() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  requireAuth(nextState, replace) {
    if (!this.isAuth()) {
      replace({
        pathname: '/login'
      })
    }
  }

  clearSession() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

}

export default new authServices();