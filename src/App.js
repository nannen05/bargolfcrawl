import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import './App.css';
import * as actions from "./store/actions";
import { Link, withRouter } from 'react-router-dom'

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
          <h3>Coming Soon</h3>
        </div>
        {/* <p className="App-intro">
          To get started, login in using GMAIL and you will be able to update your score.
        </p> */}
        <div className="App-login">
            {/* <div className="btn"><Link to="/login"> Login </Link></div>
             <div className="btn"><Link to="/signup"> Signup </Link></div> */}
            <div className="btn coming-soon"><Link to="/scores"> Enter Score </Link></div>
            <div className="btn coming-soon"><Link to="/scores"> Leaderboard </Link></div>
            <div className="btn hide"><Link to="/score/nick"> Nick </Link></div>
            <div className="btn hide"><Link to="/score/jason"> Jason </Link></div>
            <div className="btn coming-soon"><Link to="/course"> Course Rules </Link></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    //DATA
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));

//export default App
