import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../store/actions";
import { auth, firebase } from '../../firebase'
import { db } from '../../firebase/firebase'
import '../../App.css';
import logo from '../../logo.svg';


class GameList extends Component {
  constructor(props) {
      super(props);

      this.state = {
          authUser: null,
          userID: this.props.match.params.player,
          games: null,
      }

      console.log(this.props)
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });

    this.props.fetchUserGames(this.state.userID)

    this.setState({games: this.props.state.userGames})
  }

  renderGame(games) {
    const list = []
      for (const [key, value] of Object.entries(games)) {
        list.push([key, value])
      }

      console.log(list)

      return list.map((value, index) => {
          let link = "/addhole/" + this.state.userID + "/" + value[0] 
          return <p key={index} className="player-score"><span className="cap"><Link to={link}> Edit Game {index} </Link></span></p>
      })
  }
  

  render() {
  	  return(
  	  	<div className="App">
          
          <p>GameList List</p>
          <div>

            { this.renderGame(this.props.state.userGames) }

          </div>
  	  	</div>
  	  )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, actions)(GameList);