import React, { Component } from 'react';
import request from '../../../services/requestServices';

class ChangeStatusButton extends Component {

  constructor(props) {
    super(props);

    if (this.props.status == true) {
      this.label = 'Activate';
      this.className = 'btn btn-success';
    }
    else {
      this.label = 'Deactivate';
      this.className = 'btn btn-danger';
    }

    this.state = {
      label: this.label,
      className: this.className,
      status: this.props.status
    }

    this.changeStatus = this.changeStatus.bind(this);
  }

  async changeStatus(e, userId, status) {
    try {
      await request.get(`user/${userId}/changestatus`);

      if (status == true) {
        status = false;
        this.label = 'Deactivate';
        this.className = 'btn btn-danger';
      } else {
        status = true;
        this.label = 'Active';
        this.className = 'btn btn-success';
      }

      this.setState({
        status: status,
        label: this.label,
        className: this.className
      });

    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <button
        onClick={(e) => this.changeStatus(e, this.props.userId, this.state.status)}
        className={this.state.className}>{this.state.label}
      </button>
    );
  }

}

export default ChangeStatusButton;