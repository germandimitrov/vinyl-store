import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import './../../css/Record.css';
import authService from '../../services/authService';
import request from '../../services/requestServices';
import Details from  '../records/Details';

const deleteRecord = async (e, props) => {
  e.preventDefault();
  try {
    await request.delete('records/' + props.id);
    props.isDeleted(true);
  } catch (error) {
    console.log(error);
  }
}

const Record = (props) => {
  return (
    <div className="col-md-4 mb-5">
      <div className="card h-100">
          <Link to={'/records/' + props.id + '/details' }> <img className="card-img-top" src={props.picture} alt="vinyl" /> </Link>
          <div className="card-body">
            <h4 className="card-title">
            { authService.isOwner(props.userId) || authService.isAdmin() ?
                <Link to={'/records/' + props.id}> {props.name}</Link>
              :
                props.name
            }
            </h4>
            <h5 className="card-title">{props.price}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">Posted by <Link to={'/user/' + props.userId}> {props.username}</Link></p>
        </div>
        <div className="card-footer">
        <Link className="btn btn-primary" to={'/records/' + props.id + '/details' }>Details</Link>
        { authService.isOwner(props.userId) || authService.isAdmin() ?
            <>
              <Link className="btn btn-primary push-left" to={'/records/' + props.id}>Edit</Link>
              <Link
                className="btn btn-danger push-left"
                onClick={(e) => deleteRecord(e, props) }
                to={'/records/' + props.id}>
                Delete
              </Link>
            </>
          : null
        }
        </div>
      </div>
    </div>
  );
}


export default Record;
