import React, { Component } from 'react';
import '../../index.css';
import request from '../../services/requestServices';
import AdminListRow from './AdminListRow'

class AdminList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      refreshRow: false
    }

    this.refreshRow = this.refreshRow.bind(this);
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

  refreshRow(refresh) {
    this.setState({
      refreshRow:refresh
    })
  }

  render() {
    if (!this.state.users.length) {
      return <div>No users</div>;
    }

    return (
      <div className="container">
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
                  refreshRow={this.refreshRow}
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