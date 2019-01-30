import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../logo.svg';
import '../App.css';
import * as actions from "../store/actions";
import { Link, withRouter } from 'react-router-dom'
//import { auth, db } from '../firebase';
import { firebase } from '../firebase';

class Profile extends Component {
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

    //const {email, uid} = this.state.authUser

    //console.log(email)

    // const {
    //   email,
    //   password,
    //   error,
    // } = this.state;

    //const isInvalid =
      //password === '' ||
    //  email === '';

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Profile</h2>
        </div>
        <div className="App-login">
            {!!this.state.authUser && 
                
                <form onSubmit={this.onSubmit}>
                    <input
                    value={this.state.authUser.email}
                    // onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    />
                    <input
                    //value={password}
                    // onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                    />
                    <button type="submit">
                    Update
                    </button>
  
                    {/* { error && <p>{error.message}</p> } */}
                </form>
            
            }

            <div className="App-login">
              <div className="btn"><Link to="/"> Home </Link></div>
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

export default withRouter(connect(mapStateToProps, actions)(Profile));

//export default App
