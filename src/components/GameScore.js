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

class GameScoreSingle extends Component {
    constructor(props) {
        super();

        this.state = {
            score: props.data.score,
            calculatedScore: '',
        }

        this.handleScoreChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            score: nextProps.data.score
        })
    }

    handleScoreChange(e) {
        let scoreValue = e.target.value

        if(e.target.value == "") {
            console.log("empty")
        }
        if(e.target.value == this.props.par) {
            //console.log('par')
            scoreValue = e.target.value
        } else if (e.target.value < this.props.par) {
            if(e.target.value == this.props.par - 1) {
                //console.log('birdie')
                scoreValue = e.target.value
            } else if (e.target.value == this.props.par - 2) {
                //console.log('eagle')
                scoreValue = e.target.value
            } else if (e.target.value == this.props.par - 3) {
                //console.log('double eagle')
                scoreValue = e.target.value
            }
        } else if (e.target.value > this.props.par) {
            if(e.target.value == this.props.par + 1) {
                //console.log('bogey')
                scoreValue = +e.target.value// + +1
            } else if (e.target.value == this.props.par + 2) {
                //console.log('double bogey')
                scoreValue = +e.target.value// + +2
            } else {
                let higherScore = e.target.value - this.props.par
                scoreValue = +e.target.value// + +higherScore
            }
        }
        this.setState({
            score: scoreValue,
            calculatedScore: scoreValue

        }, () => {
            this.props.getScoreChange(this.state.score, this.props.id);
        })
    }


    render() {
        return (
            <div className="form-group">
                <label for="exampleInputEmail1">{`Hole Number ${this.props.id}`}</label>
                <label className="login-field-icon fui-question-circle" for="login-name"></label>
                <input
                    id={this.props.id}  
                    value={this.state.score}
                    onChange={e => this.handleScoreChange(e, this.props.id)}
                    onBlur={e => this.handleScoreChange(e, this.props.id)}
                    placeholder={"Score for Hole " + this.props.id}
                    type="text"
                    className="form-control"/>
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
                        <h4 className="tile-title">{ !!score && `Current Score: ${score.totalScore}` }</h4>
                        
                        {score.currentScore.length === 0 ? (
                            <div>Loading...</div>
                        ) : (
                            this.createScoreList()
                        )}
                        
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
