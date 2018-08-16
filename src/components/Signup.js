import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import { auth, db } from '../firebase';
import * as actions from "../store/actions";
import { SCORE } from '../data'

import logo from '../logo.svg';
import '../App.css';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  SCORE
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
}); 

class SignUp extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {

      const {
        username,
        email,
        passwordOne,
        SCORE
      } = this.state;

      const {
        history,
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          // Create a user in your own accessible Firebase Database too
          db.doCreateUser(authUser.user.uid, username, email, SCORE)
            .then(() => {
              this.setState({ ...INITIAL_STATE });
              history.push("/score/" + authUser.user.uid);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });

      e.preventDefault();
  }

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          { error && <p>{error.message}</p> }
        </form>
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

export default withRouter(connect(mapStateToProps, actions)(SignUp));

//export default App
