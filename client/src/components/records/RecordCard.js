import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import request from '../../services/requestService';
import RecordCardFooter from './RecordCardFooter';

const deleteRecord = async (e, props) => {
  e.preventDefault();
  try {
    await request.delete('records/' + props.id);
    props.isDeleted(true);
  } catch (error) {
    console.log(error);
  }
}

const RecordCard = (props) => {
  let displayName = props.artistName + ' - ' + props.name;
  return (
    <div className="col-md-4 mb-5">
      <div className="card h-100">
          <Link to={'/records/' + props.id + '/details' }> <img className="card-img-top" src={props.picture} alt="vinyl" /> </Link>
          <div className="card-body">
            <h4 className="card-title">
            {authService.isOwner(props.userId) || authService.isAdmin() ?
              <Link to={'/records/' + props.id}>{displayName}</Link>
              : displayName
            }
            </h4>
            <h5 className="card-title">{props.price}</h5>
            <p className="card-text">{props.description}</p>
          {props.userId ? <p className="card-text">By <Link to={'/user/' + props.userId}> {props.username}</Link></p> : null}
          </div>
          {props.recordCardFooter ? <RecordCardFooter {...props} deleteRecord={deleteRecord} /> : null }
      </div>
    </div>
  );
}


export default RecordCard;
