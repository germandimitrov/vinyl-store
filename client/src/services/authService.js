
class authServices {

  authenticate(token, user) {
    user = user || null;
    localStorage.setItem('token', token);

    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.username);
      if (user.roles && user.roles.length) {
        let role = user.roles.find(e => e.name === 'Admin');
        localStorage.setItem('role', role.name);
      }
    }
  }

  isAuth() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    return (localStorage.getItem('role') === 'Admin');
  }

  isOwner(userId) {
    return (Number(localStorage.getItem('userId')) === userId)
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

  getUserId() {
    return localStorage.getItem('userId')
  }

  getUsername() {
    return localStorage.getItem('username')
  }

}

export default new authServices();