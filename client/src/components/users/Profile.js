import React, { Component } from 'react';
import authService from '../../services/authService';
import request from '../../services/requestService';
import Upvote from '../fragments/Upvote';
import { Link } from 'react-router-dom';
import RecordCard from '../records/RecordCard';
import Heading from '../fragments/Heading';
import { toast } from 'react-toastify';
import './Profile.css';
import Loading from '../fragments/Loading';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      records: [],
      loaded: false,
      rateChanged: false
    };

    this.id = this.props.match.params.id;
    this.userId = this.id ? this.id : localStorage.getItem('userId');
    this.changeRate = this.changeRate.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await request.get('users/' + this.userId);
      this.setState({
        user,
        loaded: true,
        records: user.records
      });
    } catch (error) {

    }
  }

  async changeRate(rate) {
    if (!this.state.rateChanged) {
      try {
        let response = await this.checkVote(this.userId);
        if (response.errors && response.errors.length) {
          response.errors.forEach(e => (toast.error('You cannot rate the same user twice!')));
          return;
        }
      } catch (error) {
        console.log(error);
      }

      let newRate = this.state.user.rating + rate;
      if (newRate <= -1) {
        toast.error('You cannot lower the rating anymore');
        return;
      }

      this.setState({
        user: {
          ...this.state.user,
          rating: newRate
        },
        rateChanged: true,
      }, async () => {
          try {
            let response = await this.updateRating(this.state.user.rating);
            if (response.errors && response.errors.length) {
              response.errors.forEach(e => (toast.error(e.msg)));
              return;
            }
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
      return await request.get(`users/vote/${rater}/${rated}`);
    } catch (error) {
      console.log(error);
    }
  }

  async updateRating(newRating) {
    try {
      return await request.post('users/rate', {
        rater: authService.getUserId(),
        rated: this.userId,
        rating: newRating
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <div className="container">
        <Heading heading="Profile" />
        {authService.isOwner(this.userId) ? (
          <div className="edit-profile-btn">
            <Link className="btn btn-primary" to={`/user/${this.userId}/edit`}>
              Edit
            </Link>
          </div>
        ) : null }
        <div className="rela-block container push-down">
          <div className="rela-block profile-card">
            <div className="profile-pic" style={{backgroundImage: "url(" + this.state.user.picture + ")"}} id="profile_pic">
            </div>
            <div className="rela-block profile-name-container">
              <div className="rela-block user-name" id="user_name">{this.state.user.username}</div>
              <div className="rela-block user-desc" id="user_description">{this.state.user.address}</div>
            </div>
            <div className="rela-block profile-card-stats">
              <div className="floated profile-stat email" id="num_works"><br /> {this.state.user.email}<br /></div>
              <div className="floated profile-stat rating" id="num_following"> <br />
                {this.userId !== authService.getUserId() && this.state.user.rating >= 0 ?
                  <Upvote rating={this.state.user.rating} changeRate={this.changeRate}/>
                  :
                  <span className="rating-number"> {this.state.user.rating} </span>
                }
              </div>
              <div className="floated profile-stat phone" id="num_followers"><br />{this.state.user.phone}</div>
            </div>
          </div>
          <div className="row">
            {this.state.records.map(record => (
              <RecordCard {...record} key={record.id} recordCardFooter={false}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default Profile;