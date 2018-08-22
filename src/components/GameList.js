import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, auth, firebase } from '../firebase'
import '../App.css';
import logo from '../logo.svg';


class GameList extends Component {
  constructor(props) {
      super(props);
  }

  render() {

  	  return(
  	  	<div className="App">
          <p>GameList List</p>
  	  	</div>
  	  )
  }
}

export default GameList;