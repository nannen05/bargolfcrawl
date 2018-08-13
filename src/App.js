import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import './App.css';
import * as actions from "./store/actions";

class App extends Component {

  componentDidMount() {
      this.props.fetchData()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to End Of Summer (Bar) Golf Tournament</h2>
        </div>
        <p className="App-intro">
          To get started, login in using GMAIL and you will be able to update your score.
        </p>
        <div className="App-login">
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <div className="btn">Sign In</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ DATA }) => {
  return {
    DATA
  };
};

export default connect(mapStateToProps, actions)(App);

//export default App
