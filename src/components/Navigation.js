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
                  <NavagationTop links={this.state.navLinks}  />
                }
            </div>
            
        )
    }
}

class NavigationNonAuth extends Component {
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
                  name: 'Sign In',
                  link: `/signin`, 
                  //link: `/game/${this.props.match.params.game}/score/`, 
                  icon: 'fui-star-2',
              },
              {
                  name: 'Sign Up',
                  link: `/signup`, 
                  //link: `/game/${this.props.match.params.game}/score/`, 
                  icon: 'fui-user',
              }
          ],
      })
    }
  
      render() {
          return(
              <div>
                  {!!this.state.navLinks && 
                    <NavagationTop links={this.state.navLinks}  />
                  }
              </div>
              
          )
      }
  }


export default Navigation;