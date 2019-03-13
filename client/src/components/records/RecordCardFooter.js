import React from 'react';
import authService from '../../services/authService';
import { Link } from 'react-router-dom';

const RecordCardFooter = (props) => (
  <div className="card-footer">
    <Link className="btn btn-primary" to={'/records/' + props.id + '/details'}>Details</Link>
    { authService.isOwner(props.userId) || authService.isAdmin() ?
      <>
        <Link className="btn btn-primary push-left" to={'/records/' + props.id}>Edit</Link>
        <Link
          className="btn btn-danger push-left"
          onClick={(e) => props.deleteRecord(e, props)}
          to={'/records/' + props.id}>
          Delete
        </Link>
      </>
      : null
    }
  </div>
)

export default RecordCardFooter;