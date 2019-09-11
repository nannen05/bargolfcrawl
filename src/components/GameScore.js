import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import { COURSESCORES } from '../data'
import GameScoreSingle from './GameScoreSingle'
import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom'

import '../App.css';
import '../css/flat-ui.css';


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

        this.getTotalScore.bind(this);
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

    getTotalScore() {
        return this.state.score.currentScore.totalScore 
    }

    getScore(value, index) {
        const { userID } = this.state
        const { game } = this.props.match.params

        db.setGamePlayerScore(userID, game, value, index - 1, this.getCurrentScore(value, index - 1 ))
            .then(res => {
                this.setState(prevState => {
                    if(value != undefined) {
                        const currentScore = [...prevState.score.currentScore];

                        currentScore[index - 1].score = (parseInt(value, 10) || 0)

                        const score = {
                            currentScore: currentScore, 
                            totalScore: this.getCurrentScore(value, index - 1)
                        }
                        return { score };
                    }
                  })
            })
    }

    getCurrentScore(value, index) {
        let PlayerScore = []
        this.state.score.currentScore.map((value, index) => {
            PlayerScore.push( (parseInt(value.score, 10) || 0) )
        })

        PlayerScore.splice(index, 1, (parseInt(value, 10) || 0))

        return PlayerScore.reduce((a, b) => +a + +b)
    }

    createScoreList() {
        let ScoreList = this.state.score.currentScore.map((value, index) =>  {
            return <GameScoreSingle data={value} key={index} id={index + 1} getScoreChange={(value, index) => this.getScore(value, index)}/>
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
                // {
                //     name: 'Chat',
                //     link: `/game/${this.props.match.params.game}/chat`, 
                //     icon: 'fui-chat',
                // },
                {
                    name: 'Scores',
                    link: `/game/${this.props.match.params.game}/scores/`, 
                    //link: `/game/${this.props.match.params.game}/score/`, 
                    icon: 'fui-document',
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
                <div className="row tile-header">
                    <div className="col">
                        <h3 className="tile-title">{ !!user && user.username }</h3>
                        {!!this.state.navLinks && 
                            <NavagationTop links={this.state.navLinks} />
                        }
                    </div>
                </div>
                <div className="row tile">
                    <div className="col">
                        <h4 className="tile-title">SCORECARD</h4>
                        <div className="form-group form-group-header">
                            <div className="form-group-col">
                                { !!coursePar && `Par: ${coursePar}` }
                            </div>
                            <div className="form-group-col">
                                { !!score && `Score: ${score.totalScore}` }
                            </div>
                        </div>
                        
                        {score.currentScore.length === 0 ? (
                            <div>Loading...</div>
                        ) : (
                            this.createScoreList()
                        )}
                        
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

const mapStateToProps = ({ gameScore }) => {
  return {
    gameScore
  };
};

export default withRouter(connect(mapStateToProps, actions)(GameScore));
