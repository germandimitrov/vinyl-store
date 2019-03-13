import React, { Component } from 'react';
import '../../index.css';
import request from '../../services/requestService';
import AdminListRow from './AdminListRow'
import Heading from '../fragments/Heading';
import Loading from '../fragments/Loading';

class AdminList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }

    this.changeStatus = this.changeStatus.bind(this);
  }

  async componentDidMount() {
    try {
      const users = await request.get('users');
      this.setState({
        users: users
      });
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatus(userId, status) {
    try {
      let { user } = await request.put(`users/${userId}/changestatus`, {
        activeStatus: status
      });

      let index = this.state.users.findIndex((u) => u.id === userId);

      const users = [...this.state.users];
      users[index] = user;

      this.setState({
        users
      });


    } catch (error) {
      console.log(error);
    }
  }

  render() {

    if (!this.state.users.length) {
      return <Loading />
    }

    return (
      <div className="container">
        <Heading heading="Users" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Rating</th>
              <th scope="col">Suspend Account</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map(user => (
                <AdminListRow
                  user={user}
                  key={user.id}
                  changeStatus={this.changeStatus}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminList;