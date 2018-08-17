import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import './App.css';
import * as actions from "./store/actions";
import { Link, withRouter } from 'react-router-dom'
import { firebase } from './firebase';

import Navigation from './components/Navigation'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation authUser={this.state.authUser} />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to End Of Summer (Bar) Golf Tournament</h2>
          <h3>Coming Soon</h3>
        </div>
        {/* <p className="App-intro">
          To get started, login in using GMAIL and you will be able to update your score.
        </p> */}
        <div className="App-login">
            <div className="btn"><Link to="/signin"> Sign In </Link></div>
            <div className="btn"><Link to="/signup"> Signup </Link></div>
            <div className="btn"><Link to="/scores"> Scores </Link></div>
            <div className="btn"><Link to="/course"> Course Rules </Link></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    //DATA
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
