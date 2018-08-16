import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../App.css';
import logo from '../logo.svg';

class Course extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Course</h2>
            </div>
            {/* <p className="App-intro">
              To get started, login in using GMAIL and you will be able to update your score.
            </p> */}
            <div className="App-login">
                {/* <div className="btn"><Link to="/login"> Login </Link></div>
                 <div className="btn"><Link to="/signup"> Signup </Link></div> */}
                <div className="btn"><Link to="/"> Home </Link></div>
                <div className="btn"><Link to="/scores"> Scores </Link></div>
            </div>
          </div>
        )
    }
}

export default Course
