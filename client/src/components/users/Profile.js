import React, { Component } from 'react';
import authService from '../../services/authService';
import request from '../../services/requestServices';
import './Profile.css';
import Upvote from '../fragments/Upvote';
import RecordList from '../records/RecordList';
import ErrorBoundary from '../fragments/ErrorBoundary';
import Heading from '../fragments/Heading';
import Footer from '../fragments/Footer';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      records: [],
      loaded: false
    };
    this.id = this.props.match.params.id;
    this.userId = this.id ? this.id : localStorage.getItem('userId');
  }

  async componentDidMount() {
    try {
      let user = await request.get('user/' + this.userId);
      this.setState({
        user,
        loaded: true,
        records: user.records
      });
    } catch (error) {

    }
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    return (
      <>
      <Heading heading="Profile"/>
      <div className="rela-block container push-down">
        <div className="rela-block profile-card">
          <div className="profile-pic"style={{backgroundImage: "url(" + this.state.user.picture + ")"}} id="profile_pic">
          </div>
          <div className="rela-block profile-name-container">
            <div className="rela-block user-name" id="user_name">{this.state.user.username}</div>
            <div className="rela-block user-desc" id="user_description">{this.state.user.address}</div>
          </div>
          <div className="rela-block profile-card-stats">
            <div className="floated profile-stat email" id="num_works"><br /> {this.state.user.email}<br /></div>
            <div className="floated profile-stat rating" id="num_following"> <br />
              {this.userId !== authService.getUserId() ?
              <Upvote rating={this.state.user.rating} userId={this.userId} />
              : <span className="rating-number"> {this.state.user.rating} </span>
              }
            </div>
            <div className="floated profile-stat phone" id="num_followers"><br />{this.state.user.phone}</div>
          </div>
        </div>
        <RecordList records={this.state.records} loadRecords={false} />
      </div>
      </>
    );
  }

}

export default Profile;