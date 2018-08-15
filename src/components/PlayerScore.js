import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
//import logo from './logo.svg';
import '../App.css';
import * as actions from "../store/actions";
import update from 'react-addons-update';
import { userData } from '../data'


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
        if(e.target.value == this.props.par) {
            console.log('par')
            scoreValue = e.target.value
        } else if (e.target.value < this.props.par) {
            if(e.target.value == this.props.par - 1) {
                console.log('birdie')
                scoreValue = e.target.value
            } else if (e.target.value == this.props.par - 2) {
                console.log('eagle')
                scoreValue = e.target.value
            } else if (e.target.value == this.props.par - 3) {
                console.log('double eagle')
                scoreValue = e.target.value
            }
        } else if (e.target.value > this.props.par) {
            if(e.target.value == this.props.par + 1) {
                console.log('bogey')
                scoreValue = +e.target.value// + +1
            } else if (e.target.value == this.props.par + 2) {
                console.log('double bogey')
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
           <div>
              <p>Par: <span>{this.props.par}</span></p>
              <input type="text" placeholder={"Score for Hole " + this.props.id} id={this.props.id} value={this.state.score} onChange={e => this.handleScoreChange(e, this.props.id)}/>
           </div>
        )
    }
}

class Score extends Component {
  constructor(props) {
    super(); // or super(props) ?
    
    this.state = {
          user: '',
          courseHoles: [
            {
              "par": 4,
            },
            {
              "par": 4,
            },
            {
              "par": 5,
            },
            {
              "par": 5,
            },
            { 
              "par": 5,
            },
            {
              "par": 5,
            },
            {
              "par": 5,
            },
            {
              "par": 5,
            },
            {
              "par": 5,
            }
          ],
          holes: "",
          totalScore: 0,
          coursePar: 0
      }

      this.getScore.bind(this)
      this.getTotalScore.bind(this);
  }
 
  componentDidMount() {
      let parScore = []
      const i = userData.findIndex((user) => user.name  === this.props.match.params.player);
      const player = userData[i]
      let PlayerScore = []
      this.props.state.userData[i].courseScore.map((value, index) => {
          PlayerScore.push( value.score )
      })

      this.state.courseHoles.map((value, index) => {
          parScore.push( value.par )
      })
      this.setState({
          user: player,
          holes: this.state.courseHoles.length,
          coursePar: parScore.reduce((a, b) => a + b),
          totalScore: PlayerScore.reduce((a, b) => +a + +b)
      })

  }

  getTotalScore() {
      const i = userData.findIndex((user) => user.name  === this.props.match.params.player);
      return <span>{ this.props.state.userData[i].totalScore }</span>
  }

  getScore(value, index) {

      // let newScore = this.state.score
      // newScore[index - 1].score = value
      // let updatedScore = +value + +this.state.totalScore
      // this.setState({
      //     newScore
      // })

      const i = userData.findIndex((user) => user.name  === this.props.match.params.player)

      // let PlayerScore = []
      // this.props.state.userData[i].courseScore.map((value, index) => {
      //     PlayerScore.push( value.score )
      // })
      // this.setState({
      //     totalScore: PlayerScore.reduce((a, b) => +a + +b)
      // }, () => {
          
      // })

      
      this.props.changeScore(value, index - 1, i)
  }

  renderScoreList() {
      const i = this.props.state.userData.findIndex((user) => user.name  === this.props.match.params.player);

      const user = userData[i]
      let Score = this.props.state.userData[i].courseScore.map((value, index) =>  {
          return <SingleScore data={value} par={this.state.courseHoles[index].par} key={index} id={index + 1} getScoreChange={(value, index) => this.getScore(value, index)}/>
      })
      
      return Score
  }
 
  render() {
    let ScoreList = this.renderScoreList()
    let totalScore = this.getTotalScore()

    return (
      <div className="App">
        <div className="App-header">
          <h2>Score for <span className="cap">{this.state.user.name}</span></h2>
        </div>
        <p>Course Par: {this.state.coursePar}</p>
        <div>{ScoreList}</div>
        <div><span>Total Score: {totalScore}</span></div>
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