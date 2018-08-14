import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../logo.svg';
import '../App.css';
import * as actions from "../store/actions";
import { Link, withRouter } from 'react-router-dom'

class Login extends Component {

  componentDidMount() {
      this.props.fetchData()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Login</h2>
        </div>
        <p className="App-intro">
          To get started, login in using GMAIL and you will be able to update your score.
        </p>
        <div className="App-login">
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <div className="btn">Login</div>

            <div className="btn"><Link to="/"> Back </Link></div>
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

export default withRouter(connect(mapStateToProps, actions)(Login));

//export default App
