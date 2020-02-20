import React, { Component } from 'react';
import { connect } from "react-redux";

import * as actions from "./store/actions";
import { withRouter } from 'react-router-dom'
import { firebase } from './firebase';

import Navigation from './components/Navigation'

import golfHole from '../src/images/golf-hole.svg';
import './App.css';
import './css/flat-ui.css';

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
      <div className="App index">
        <div className="overlay"></div>
        <div className="background"></div>
        <div className="container">
          <div className="row tile-header">
              <div className="col">
                  <object data={golfHole}></object>
                  <h3 className="tile-title">Bar Golf</h3>
              </div>
          </div>
        </div>
        <div className="row tile">
          <Navigation authUser={this.state.authUser} />
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
