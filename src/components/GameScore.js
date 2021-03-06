import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import GameScoreSingle from './GameScoreSingle'

import NavBar from './NavBar';
import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom'

import '../App.css';
import '../css/flat-ui.css';

const specialrule = (value, inde) => {
    
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
            holeNumber: null,
            playerScore: false,
            rules: null,
            specialRules: [],
            coursePar: null,
            courseParHoles: [],
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

                    // Push Player To Game DataBase
                    //db.setGameUser(game, player, this.state.user.username)
                })

                // Get Player Score after User is Set
                db.getGamePlayerScore(game, player)
                    .then(res => {

                        if(res === undefined) {
                            getGamePlayerScoreCallback(game, player)
                            return
                        }

                        // Notify Chat of New User
                        
                        this.setState({
                            score: res
                        })

                    })
                
                const getGamePlayerScoreCallback = (game, player) => {
                    db.getGamePlayerScore(game, player)
                        .then(res => {
                            console.log(res)
                            this.setState({
                                score: res
                            })
                        })
                }

                // Get Rules and Course Par from gameRules
                db.getGameRules(game)
                    .then(res => {
                        this.getCourseRules(res)
                        this.getCoursePar(res)
                    })

                db.getGameSpecialRules(game)
                    .then(res => {
                        this.setState({
                            specialRules: res
                        })
                    })

                // Get Hole Number Limit
                db.getGameHoleNumber(game)
                    .then(res => {
                        this.setState({
                            holeNumber: res
                        })
                    })
            } else {
                const {
                    history,
                  } = this.props;

                history.push("/");
            }

            console.log(this.props)
        })

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

    getCourseRules(data) {
        let rules = []
        
        data.map((value, index) => {
            rules.push( value )
        })

        this.setState({ rules })
    }

    getCoursePar(data) {
        let coursePar = []

        data.map((value, index) => {
            coursePar.push( (parseInt(value.parScore, 10) || 0) )
        })

        this.setState({
            coursePar: coursePar.reduce((a, b) => +a + +b),
            courseParHoles: coursePar
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
        const { holeNumber, courseParHoles, score, rules } = this.state

        if(rules) {
            //let ScoreList = this.state.score.currentScore.splice(0, holeNumber + 1).map((value, index) =>  {
            let ScoreList = score.currentScore.map((value, index) =>  {   
                return <GameScoreSingle 
                            data={value} 
                            par={courseParHoles[index]}
                            rule={rules[index]}
                            key={index} id={index + 1} 
                            getScoreChange={(value, index) => this.getScore(value, index)}
                        />
            })
    
            return ScoreList
        }

    }

    createSpecialRules() {
        const { specialRules } = this.state 

        let special = specialRules.map((value, index) => {
            return <div key={index}>{value.rule} - {value.score}</div>
        })

        return special
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

        const { user, coursePar, courseParHoles, score, holeNumber, specialRules } = this.state

        return (
          <div className="App">
            <NavBar />
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
                                { !!coursePar && `Course Par: ${coursePar}` }
                            </div>
                            <div className="form-group-col">
                                { !!score && `Score: ${score.totalScore}` }
                            </div>
                        </div>
                        
                        {(score.currentScore.length === 0 && holeNumber != null && courseParHoles.length === 0) ? (
                            <div>Loading...</div>
                        ) : (
                            this.createScoreList()
                        )}

                        {(specialRules.length === 0) ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="special-rules">
                                <h4 className="tile-title">Special Rules</h4>
                                <div className="tile">
                                    {this.createSpecialRules()}
                                </div>
                            </div>
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
