import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import * as actions from "../store/actions";

import '../App.css';
import '../css/flat-ui.css';

import FixedNavagationBottom from './FixedNavagationBottom';

class GameScores extends Component {
  constructor(props) {
    super(); // or super(props) ?

    this.state = {
      users: null,
      userNames: null,
    };

  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ userNames: snapshot.val() })
    );

    db.getGameUsers(this.props.match.params.game)
        .then(users => {
            this.setState({ users })
        })

    this.createBottomNav()
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
          return <p key={index} className="player-score"><span className="cap">{value[2]}</span>  <span className="right">Score: {value[1]}</span></p>
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
                name: 'Chat',
                link: `/game/${this.props.match.params.game}/chat`, 
                icon: 'fui-chat',
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
            <div className="row tile">
                <div className="col">
                    <h3 className="tile-title">Scores</h3>
                </div>
                <div className="col">
                    { !!users && this.renderSortedList(users) }
                </div>
            </div>
        </div>
        {!!this.state.navLinks && 
            <FixedNavagationBottom links={this.state.navLinks} />
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
