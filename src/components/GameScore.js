import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import { COURSESCORES } from '../data'
import FixedNavagationBottom from './FixedNavagationBottom';

import '../App.css';
import '../css/flat-ui.css';
import { async } from '@firebase/util';

class GameScoreSingle extends Component {
    constructor(props) {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="text" value="" placeholder="Inactive" className="form-control"/>
            </div>
        )
    }
}

class GameScore extends Component {
    constructor(props) {
        super();

        this.state = {
            user: null,
            userID: null,
            game: null,
            score: {
                currentScore: [],
                totalScore: 0
            },
            playerScore: false,
            coursePar: null,
            authUser: null,
            navLinks: []
        }
    }

    async componentDidMount() {
        const { game , player } = this.props.match.params

        firebase.auth.onAuthStateChanged(authUser => {
            if(firebase.auth.currentUser) {

                // Get Current User
                db.getCurrentUser(player).on("value", snapshot => {
                    this.setState({ user: snapshot.val(), userID: this.props.match.params.player })
                })

                // Push Player To Game DataBase
                db.setGameUser(game, player)

                // Get Player Score
                db.getGamePlayerScore(game, player)
                    .then(res => {
                        this.setState({
                            score: res
                        })
                    })
            }
        })

        this.createCoursePar()
        this.createBottomNav()
    }

    createScoreList() {
        let ScoreList = this.state.score.currentScore.map((value, index) =>  {
            //return <SingleScore data={value} par={this.state.courseHoles[index].par} key={index} id={index + 1} getScoreChange={(value, index) => this.getScore(value, index)}/>
            return <GameScoreSingle key={index}/>
        })
  
        return ScoreList
    }

    createCoursePar() {
        let parScore = []

        COURSESCORES.map((value, index) => {
            parScore.push( value.par )
        })
        this.setState({
            coursePar: parScore.reduce((a, b) => a + b),
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

        const { user, coursePar, score } = this.state

        return (
          <div className="App">
            <div className="container">
                <div className="row tile">
                    <div className="col">
                        <h4 className="tile-title">Scorecard</h4>
                        <h3 className="tile-title">{ !!user && user.username }</h3>
                        <h4 className="tile-title">{ !!coursePar && `Course Par: ${coursePar}` }</h4>
                        
                        {this.state.score.currentScore === 0 ? (
                            <div>Loading...</div>
                        ) : (
                            this.createScoreList()
                        )}
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="text" value="" placeholder="Inactive" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="text" value="" placeholder="Inactive" className="form-control"/>
                        </div>
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



const mapStateToProps = ({ gameScore }) => {
  return {
    gameScore
  };
};

export default withRouter(connect(mapStateToProps, actions)(GameScore));
