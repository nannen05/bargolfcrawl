import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
//import logo from './logo.svg';
import '../App.css';
import { db } from '../firebase'
import * as actions from "../store/actions";
import update from 'react-addons-update';

class Score extends Component {
  constructor(props) {
    super(); // or super(props) ?

    this.state = {
      users: null,
    };

  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  renderSortedList(users) {
      var sortable = [];
      for (var i in users) {
          sortable.push([i, users[i].SCORE.totalScore, users[i].username]);
      }
      const sortedList = sortable.sort(function(a, b) {
          return a[1] - b[1];
      })

      return sortedList.map((value, index) => {
          return <p key={index} className="player-score"><span className="cap">{value[2]}</span>  <span className="right">Score: {value[1]}</span></p>
      })
  }

  render() {

    const { users } = this.state

    return (
      
      <div className="App">
        <div className="App-header">
          <h2>Player Scores</h2>

          { !!users && this.renderSortedList(users) }

          <div className="btn"><Link to="/"> Back </Link></div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, actions)(Score);
