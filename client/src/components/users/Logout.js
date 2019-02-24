import { Component } from 'react';
import authService from '../../services/authService';

class Logout extends Component {

  componentDidMount() {
    authService.clearSession();
    this.props.history.push('/');
  }

  render() {
    return (null);
  }

}

export default Logout;