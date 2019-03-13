
class authService {

  authenticate(token, user) {
    user = user || null;
    localStorage.setItem('token', token);

    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', user.username);
      if (user.roles && user.roles.length) {
        let role = user.roles.find(e => e.name === 'Admin');
        if (role) {
          localStorage.setItem('role', role.name);
        }
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
    return (Number(localStorage.getItem('userId')) === Number(userId))
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

  setUser(user) {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  get(property) {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.hasOwnProperty(property)) {
      return user[property];
    }
    else {
      return null;
    }
  }

}

export default new authService();