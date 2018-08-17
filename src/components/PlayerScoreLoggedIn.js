import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
//import logo from './logo.svg';
import '../App.css';
import * as actions from "../store/actions";
import update from 'react-addons-update';
import { userData } from '../data'
import { db } from '../firebase'


class SingleScore extends Component  {
    constructor(props) {
        super()

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
           <div className="score">
              <p>Par: <span>{this.props.par}</span></p>
              <input type="text" placeholder={"Score for Hole " + this.props.id}
                     id={this.props.id}
                     value={this.state.score}
                     onChange={e => this.handleScoreChange(e, this.props.id)}
                     onBlur={e => this.handleScoreChange(e, this.props.id)}/>
           </div>
        )
    }
}

class Score extends Component {
  constructor(props) {
    super(); // or super(props) ?

    this.state = {
          user: null,
          userID: null,
          courseHoles: [
            {
              "par": 3,
            },
            {
              "par": 4,
            },
            {
              "par": 3,
            },
            {
              "par": 5,
            },
            {
              "par": 3,
            },
            {
              "par": 5,
            },
            {
              "par": 4,
            },
            {
              "par": 3,
            },
            {
              "par": 4,
            }
          ],
          holes: "",
          totalScore: null,
          coursePar: 0
      }

      //this.getScore.bind(this)
      this.getTotalScore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      console.log(nextProps)
  }

  componentDidMount() {
    const userID = this.props.match.params.player
    db.getCurrentUser(userID).on("value", snapshot => {
        this.setState({ user: snapshot.val(), userID: this.props.match.params.player })
    })

    let parScore = []


    this.state.courseHoles.map((value, index) => {
          parScore.push( value.par )
    })
    this.setState({
        // user: player,
        // holes: this.state.courseHoles.length,
        coursePar: parScore.reduce((a, b) => a + b),
        //totalScore: PlayerScore.reduce((a, b) => +a + +b)
    })

  }

  getTotalScore() {
      return <span>{ this.state.user.SCORE.totalScore }</span>
  }

  getScore(value, index) {

      let PlayerScore = []
      this.state.user.SCORE.courseScore.map((value, index) => {
          PlayerScore.push( value.score )
      })

      this.props.updateScore(this.state.userID, value, index - 1, PlayerScore.reduce((a, b) => +a + +b))

      //this.props.updateTotalScore(this.state.userID, PlayerScore.reduce((a, b) => +a + +b))
  }

  renderScoreList(user) {

      let Score = user.SCORE.courseScore.map((value, index) =>  {
          return <SingleScore data={value} par={this.state.courseHoles[index].par} key={index} id={index + 1} getScoreChange={(value, index) => this.getScore(value, index)}/>
      })

      return Score
  }

  render() {
    const { user } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <h2>Score for <span className="cap">{ !!user && user.username }</span></h2>
        </div>
        <p>Course Par: {this.state.coursePar}</p>
        <div>{ !!user && this.renderScoreList(user) }</div>
        <div className="totalscore"><span>Total Score: { !!user && user.SCORE.totalScore }</span></div>
        <div className="btn"><Link to="/"> Back </Link></div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    state
  };
};

export default withRouter(connect(mapStateToProps, actions)(Score));
