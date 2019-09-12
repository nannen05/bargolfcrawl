import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { withRouter } from 'react-router-dom'
import { firebase, db } from '../firebase';

import NavBar from './NavBar';
import NavagationTop from './NavagationTop';

import '../App.css';
import '../css/flat-ui.css';

class Profile extends Component {
  constructor(props) {
      super(props);

      this.state = {
          authUser: null,
          authUserName: null,
          userName: '',
      };

      this.handleChange.bind(this);
      this.handleSubmit.bind(this);
  }

  componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if(firebase.auth.currentUser) {
          this.setState({ authUser })

          db.getCurrentUser(firebase.auth.currentUser.uid)
            .once('value')
            .then(snapshot => {

                this.setState({
                    authUserName: snapshot.val().username
                })  
            })
        }

        this.setState({
          navLinks: [
              {
                  name: 'Home',
                  link: '/',
                  icon: 'fui-home',
              },
              {
                name: 'Games',
                link: `/games`, 
                icon: 'fui-star-2',
              },
              {
                  name: 'Sign Out',
                  link: `/games`,
                  icon: 'fui-power',
              }
          ],
        })
      });
  }

  handleChange(event) {
    this.setState({authUserName: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.authUserName);
    db.changeUserName(this.state.authUser.uid, this.state.authUserName)
    event.preventDefault();
  }

  render() {

    const { authUser, authUserName } = this.state

    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <div className="row tile-header">
              <div className="col">
                  <h3 className="tile-title">Profile</h3>
                  {!!this.state.navLinks && 
                      <NavagationTop links={this.state.navLinks} />
                  }
              </div>
          </div>
          <div className="row tile">
              <div className="col">
                  {!!authUser && 
                    
                    <form onSubmit={this.handleSubmit}>
                        <div class="form">
                          <div className="form-group form-group-input">
                              <input 
                                value={authUserName}
                                onChange={e => this.handleChange(e)}
                                type="text" 
                                className="input-field" 
                                placeholder="Enter your name" 
                              />
                          </div>
                          <div onClick={e => this.handleSubmit(e)} type="submit" value="Update Info" class="btn btn-primary btn-lg btn-block input-btn">Update Username</div>
                      </div>
                    </form>
                  }
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

export default withRouter(connect(mapStateToProps, actions)(Profile));
