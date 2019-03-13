import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const rateUp = 1;
const rateDown = -1;

const changeRate = (rate, props) => {
  props.changeRate(rate);
}

const Upvote = (props) => {
  return (
    <>
      <span onClick={() => {changeRate(rateUp, props)}}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          size="2x"
          color="#55BD9C"
        />
      </span>
      <span className="rating-number"> {props.rating} </span>
      <span onClick={() => {changeRate(rateDown, props)}}>
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="2x"
          color="#DD725F"
        />
      </span>
    </>
  );
}

export default Upvote;