import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import request from '../../services/requestServices';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

class Upvote extends Component {

  constructor(props) {
    super(props);
    this.changeRate = this.changeRate.bind(this);

    this.state = {
      rating: null,
      rateChanged: false
    }
  }

  async componentDidMount() {
    this.setState({
      rating: this.props.rating
    })
  }

  async changeRate(raiseUp) {
    if (!this.state.rateChanged) {
      try {
        let response = await this.checkVote(this.props.userId);
        if (response.errors && response.errors.length) {
          response.errors.forEach(e => (toast.error('You cannot rate the same user twice!')));
          return;
        }
      } catch (error) {
        console.log(error);
      }
      let value = 0;
      raiseUp ? value += 1 : value -= 1;
      this.setState({
        rating: this.state.rating + value,
        rateChanged: true,
      }, async () => {
          try {
            await this.updateRating(this.props.userId, this.state.rating);
            toast.success('Your vote was cast!');
          } catch (error) {
            console.log(error);
          }
      })
    } else {
      toast.error('You cannot rate the same user!');
    }
  }

  async checkVote(userId) {
    let rater = authService.getUserId();
    let rated = userId;
    try {
      return await request.get(`user/vote/${rater}/${rated}`, {}, {});
    } catch (error) {
      console.log(error);
    }
  }

  async updateRating(userId, newRating) {
    try {
      return await request.post('user/rate', {}, {
        rater: authService.getUserId(),
        rated: userId,
        rating: newRating
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <span onClick={() => { this.changeRate(true) } }> <FontAwesomeIcon icon={faThumbsUp} size="2x" color="green"/> </span>
        <span> {this.state.rating} </span>
        <span onClick={() => { this.changeRate(false)  } } > <FontAwesomeIcon icon={faThumbsDown} size="2x" color="red"/> </span>
      </>
    );
  }
}

export default Upvote;