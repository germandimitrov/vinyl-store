import React from 'react';
import { Link } from 'react-router-dom';

const record = ({ records }) => (
  <>
    {records.map(record => (
      <div className="col-lg-4 col-md-6 mb-4" key={record.id}>
        <div className="card h-100">
          <Link className="card-img-top" to={'/records/' + record.id}> <img src="http://placehold.it/350x40" alt="vinyl" /> </Link>
          <div className="card-body">
            <h4 className="card-title">
              <Link to={'/records/' + record.id}> {record.name}</Link>
            </h4>
              <h5>{record.price}</h5>
              <p className="card-text">{record.description}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">★ ★ ★ ★ ☆</small>
          </div>
        </div>
      </div>
    ))}
    </>
);

export default record;
