import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { withRouter } from 'react-router-dom'
import { auth } from '../firebase';
import NavagationTop from './NavagationTop';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
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
            name: 'Sign Up',
            link: `/signup`, 
            icon: 'fui-user',
          },
      ],
    })
  }

  handleSubmit = (e) => {
      const {
        email,
        password,
      } = this.state;

      const {
        history,
      } = this.props;

      auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          history.push("/");
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });

      e.preventDefault();
  }

  render() {

    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="App">
        <div className="container">
          <div className="row tile-header">
              <div className="col">
                  <h3 className="tile-title">Sign In</h3>
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
                              value={email}
                              onChange={event => this.setState(byPropKey('email', event.target.value))}
                              type="text"
                              placeholder="Email Address"
                              className="input-field" 
                            />
                        </div>
                        <div className="form-group form-group-input">
                            <input 
                              value={password}
                              onChange={event => this.setState(byPropKey('password', event.target.value))}
                              type="password"
                              placeholder="Password"
                              className="input-field" 
                            />
                        </div>
                        <div 
                          onClick={e => this.handleSubmit(e)} 
                          disabled={isInvalid}
                          type="submit" 
                          value="Update Info" 
                          className="btn btn-primary btn-lg btn-block input-btn">
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

export default withRouter(connect(mapStateToProps, actions)(SignIn));

//export default App
