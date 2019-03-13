import React from 'react';
import ChangeStatusButton from './ChangeStatusButton';

const AdminListRow = ({ user, changeStatus }) =>  {
  return (
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
      <td>{user.rating}</td>
      <td>
        {
          user.rating === 0 ?
            <ChangeStatusButton userId={user.id} status={user.active} changeStatus={changeStatus} />
          : null
        }
      </td>
    </tr>
  )
}
export default AdminListRow;