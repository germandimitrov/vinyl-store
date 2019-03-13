import React from 'react';

const changeStatus =  (e, props) => {
  props.changeStatus(props.userId, !props.status);
}

const ChangeStatusButton = (props) =>  {
  return (
    <button
      onClick={(e) => changeStatus(e, props)}
      className={props.status ? 'btn btn-danger' : 'btn btn-success'}>
      {props.status ? 'Deactivate' : 'Activate'}
    </button>
  );

}

export default ChangeStatusButton;