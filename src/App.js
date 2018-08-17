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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to End Of Summer (Bar) Golf Tournament</h2>
        </div>
        <Navigation authUser={this.state.authUser} />
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
