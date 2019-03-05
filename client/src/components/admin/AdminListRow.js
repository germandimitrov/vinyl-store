import React, { Component } from 'react';
import ChangeStatusButton from './ChangeStatusButton';

const AdminListRow = (props) =>  {
  return (
    <tr>
      <th scope="row">{props.user.id}</th>
      <td>{props.user.username}</td>
      <td>{props.user.email}</td>
      <td>{props.user.address}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.rating}</td>
      <td>
        {
          props.user.rating < 2 ?
            <ChangeStatusButton userId={props.user.id} status={props.user.active} />
          : null
        }
      </td>
    </tr>
  )
}
export default AdminListRow;