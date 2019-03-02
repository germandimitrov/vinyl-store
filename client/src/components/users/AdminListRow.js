import React, { Component } from 'react';
import request from '../../services/requestServices';
import ChangeStatusButton from './Admin/ChangeStatusButton';

class AdminListRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.user.id}</th>
        <td>{this.props.user.username}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.address}</td>
        <td>{this.props.user.phone}</td>
        <td>{this.props.user.rating}</td>
        <td>
          {
            this.props.user.rating < 2 ?
              <ChangeStatusButton userId={this.props.user.id} status={this.props.user.active} />
            : null
          }
        </td>
      </tr>
    )
  }

}
export default AdminListRow;