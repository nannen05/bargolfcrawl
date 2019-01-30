import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const SignOutButton = () =>
  <div className="btn signout"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </div>


const Navigation = ({ authUser }) =>
  
  <div>
    { authUser
        ? <NavigationAuth id={authUser.uid} />
        : <NavigationNonAuth />
    }
  </div>

class NavigationAuth extends Component {

    render() {
        const playerScoreLink = "/score/" + this.props.id

        return(

            <div className="App-login">
              <div className="btn"><Link to={playerScoreLink}> Player Score </Link></div>
              <div className="btn"><Link to="/scores"> Scores </Link></div>
              <div className="btn"><Link to="/course"> Course Rules </Link></div>
              <div className="btn"><Link to="/profile"> Profile </Link></div>
              <SignOutButton />
            </div>
        )
    }
}


const NavigationNonAuth = () =>
  <div className="App-login">
    <p className="App-intro">
       To get started, Sign in or Sign up and you will be able to update your score.<br/><br/>
    </p>
    <div className="btn"><Link to="/signin"> Sign In </Link></div>
    <div className="btn"><Link to="/signup"> Sign Up </Link></div>
    <div className="btn"><Link to="/scores"> Scores </Link></div>
    <div className="btn"><Link to="/course"> Course Rules </Link></div>
  </div>

export default Navigation;