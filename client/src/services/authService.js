
class authServices {
  constructor() {

  }

  authenticate(token, user) {
    user = user || null;
    sessionStorage.setItem('token', token);
    if (user) {
      sessionStorage.setItem('user', user.id)
    }
  }

  isAuth() {
    if (sessionStorage.getItem('token')) {
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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

}

export default new authServices();