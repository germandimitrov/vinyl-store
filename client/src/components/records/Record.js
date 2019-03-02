import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/Record.css';

const Record = (props) => (
  (
    <div className="col-md-4 mb-5">
    <div className="card h-100">
        <img className="card-img-top" src={props.picture} alt="" />
        <div className="card-body">
          <h4 className="card-title"><Link to={'/records/' + props.id}> {props.name}</Link></h4>
          <h5 className="card-title">{props.price}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">Posted by <b> <Link to={'/user/' + props.userId}> {props.username}</Link> </b> </p>
      </div>
      <div className="card-footer">
        <a href="#" className="btn btn-primary">Find Out More!</a>
      </div>
      </div>
    </div>
  )
)


export default Record;
