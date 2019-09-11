import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom';

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
  constructor(props) {
      super();

      this.state = {
          navLinks: []
      }
  }

  componentDidMount() {
    this.setState({
        navLinks: [
            {
                name: 'Games',
                link: `/games`, 
                //link: `/game/${this.props.match.params.game}/score/`, 
                icon: 'fui-star-2',
            },
            {
                name: 'Profile',
                link: `/profile`, 
                //link: `/game/${this.props.match.params.game}/score/`, 
                icon: 'fui-user',
            },
            {
                name: 'Sign Out',
                link: `/games`,
                icon: 'fui-power',
            }
        ],
    })
  }

    render() {
        return(
            <div>
                {!!this.state.navLinks && 
                  <NavagationTop links={this.state.navLinks} />
                }
                <div className="App-login">
                  <SignOutButton />
                </div>
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
    {
      // <div className="btn"><Link to="/scores"> Scores </Link></div>
      // <div className="btn"><Link to="/course"> Course Rules </Link></div>
    }
  </div>

export default Navigation;