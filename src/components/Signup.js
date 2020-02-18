import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { auth, db } from '../firebase';
import * as actions from "../store/actions";
import { SCORE } from '../data'

import NavBar from './NavBar';
import NavagationTop from './NavagationTop';

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

  handleSubmit = (e) => {
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
              history.push("/");
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

  componentDidMount() {
    this.setState({
      navLinks: [
          {
              name: 'Home',
              link: '/',
              icon: 'fui-home',
          },
          {
            name: 'Sign In',
            link: `/signin`, 
            icon: 'fui-user',
          },
      ],
    })
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
        <div className="container">
          <NavBar />
          <div className="row tile-header">
              <div className="col">
                  <h3 className="tile-title">Sign Up</h3>
                  {!!this.state.navLinks && 
                      <NavagationTop links={this.state.navLinks} />
                  }
              </div>
          </div>
          <div className="row tile">
              <div className="col">
                  <form onSubmit={this.handleSubmit}>
                      <div class="form">
                        <div className="form-group form-group-input">
                            <input 
                              value={username}
                              onChange={event => this.setState(byPropKey('username', event.target.value))}
                              type="text"
                              placeholder="Full Name"
                              className="input-field" 
                            />
                        </div>
                        <div className="form-group form-group-input">
                            <input 
                              value={email}
                              onChange={event => this.setState(byPropKey('email', event.target.value))}
                              type="text"
                              placeholder="Email Address"
                              className="input-field" 
                            />
                        </div>
                        <div className="form-group form-group-input">
                            <input 
                              value={passwordOne}
                              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                              type="password"
                              placeholder="Password"
                              className="input-field" 
                            />
                        </div>
                        <div className="form-group form-group-input">
                            <input 
                              value={passwordTwo}
                              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                              type="password"
                              placeholder="Confirm Password"
                              className="input-field" 
                            />
                        </div>
                        <div 
                            onClick={e => this.handleSubmit(e)} 
                            disabled={isInvalid}
                            type="submit" 
                            value="Update Info" 
                            class="btn btn-primary btn-lg btn-block input-btn">
                              Sign In
                        </div>
                          { error && <p>{error.message}</p> }
                      </div>
                  </form>
              </div>
          </div>
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

export default withRouter(connect(mapStateToProps, actions)(SignUp));

//export default App
