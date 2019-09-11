import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { db, firebase } from '../firebase'
import * as actions from "../store/actions";

import '../App.css';
import '../css/flat-ui.css';

import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom';

class GameScores extends Component {
  constructor(props) {
    super(); // or super(props) ?

    this.state = {
      users: null,
      userNames: null,
      authUser: null
    };

  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
        if(firebase.auth.currentUser) {
            console.log(firebase.auth.currentUser)
            // Get Current User
            this.setState({ authUser: firebase.auth.currentUser })
            

            this.createBottomNav()
        }
    })

    db.onceGetUsers().then(snapshot =>
      this.setState({ userNames: snapshot.val() })
    );

    db.getGameUsers(this.props.match.params.game)
        .then(users => {
            this.setState({ users })
        })
  }

  renderSortedList(users) {
      var sortable = [];
      for (var i in users) {
          let userName = ''
          Object.keys(this.state.userNames).map((key, index) => {
            if(Object.keys(this.state.userNames)[index]== users[i].userID) {
                userName = this.state.userNames[key].username
            }
          })
          sortable.push([i, users[i].SCORE.totalScore, userName]);
      }
      const sortedList = sortable.sort(function(a, b) {
          return a[1] - b[1];
      })

      return sortedList.map((value, index) => {
          return <div key={index} className="form-group form-group-text"><div className="form-group-col">{value[2]}</div><div className="form-group-col">Score: {value[1]}</div></div>
      })
  }

  createBottomNav() {
    this.setState({
        navLinks: [
            {
                name: 'Home',
                link: '/',
                icon: 'fui-home',
            },
            {
                name: 'Score',
                link: `/game/${this.props.match.params.game}/score/${this.state.authUser.uid}`, 
                //link: `/game/${this.props.match.params.game}/score/`, 
                icon: 'fui-new',
            },
            {
                name: 'Back',
                link: `/game/${this.props.match.params.game}/`,
                icon: 'fui-arrow-left',
            }
        ],
    })
}


  render() {

    const { users } = this.state

    return (
      
      <div className="App">
        <div className="container">
            <div className="row tile-header">
                <div className="col">
                    <h3 className="tile-title">Scores</h3>
                    {!!this.state.navLinks && 
                        <NavagationTop links={this.state.navLinks} />
                    }
                </div>
            </div>
            <div className="row tile">
                <div className="col">
                    { !!users && this.renderSortedList(users) }
                </div>
            </div>
        </div>
        {!!this.state.navLinks && 
            <NavagationBottom links={this.state.navLinks} />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, actions)(GameScores);
