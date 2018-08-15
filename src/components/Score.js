import React, { Component } from 'react';
import { connect } from "react-redux";
//import logo from './logo.svg';
import '../App.css';
import * as actions from "../store/actions";
import update from 'react-addons-update';

class SingleScore extends Component  {
    constructor(props) {
        super()

        this.state = {
            score: '',
            calculatedScore: '',
        }

        this.handleScoreChange.bind(this);
    }

    handleScoreChange(e) {
        let scoreValue = e.target.value
        if(e.target.value == this.props.data.par) {
            console.log('par')
            scoreValue = e.target.value
        } else if (e.target.value < this.props.data.par) {
            if(e.target.value == this.props.data.par - 1) {
                console.log('birdie')
                scoreValue = e.target.value
            } else if (e.target.value == this.props.data.par - 2) {
                console.log('eagle')
                scoreValue = e.target.value
            } else if (e.target.value == this.props.data.par - 3) {
                console.log('double eagle')
                scoreValue = e.target.value
            }
        } else if (e.target.value > this.props.data.par) {
            if(e.target.value == this.props.data.par + 1) {
                console.log('bogey')
                scoreValue = +e.target.value// + +1
            } else if (e.target.value == this.props.data.par + 2) {
                console.log('double bogey')
                scoreValue = +e.target.value// + +2
            } else {
                let higherScore = e.target.value - this.props.data.par
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
              <p>Par: <span>{this.props.data.par}</span></p>
              <input type="text" placeholder={"Score for Hole " + this.props.id} id={this.props.id} value={this.state.score} onChange={e => this.handleScoreChange(e, this.props.id)}/>
           </div>
        )
    }
}

class Score extends Component {
  constructor(props) {
    super(); // or super(props) ?
    this.state = {
          score: [
            {
              "par": 4,
              "score": 0,
            },
            {
              "par": 4,
              "score": 0,
            },
            {
              "par": 5,
              "score": 0,
            },
            {
              "par": 5,
              "score": 0,
            },
            { 
              "par": 5,
              "score": 0,
            },
            {
              "par": 5,
              "score": 0,
            },
            {
              "par": 5,
              "score": 0,
            },
            {
              "par": 5,
              "score": 0,
            },
            {
              "par": 5,
              "score": 0,
            }
          ],
          holes: "",
          totalScore: 0,
          coursePar: 0
      }

      this.getScore.bind(this)
  }
 
  componentDidMount() {
      let parScore = []
      this.state.score.map((value, index) => {
          console.log(value)
          parScore.push( value.par )
      })
      this.setState({
          holes: this.state.score.length,
          coursePar: parScore.reduce((a, b) => a + b)
      })
  }

  getTotalScore() {
      return <span>this.state.totalScore</span>
  }

  getScore(value, index) {

      let newScore = this.state.score
      newScore[index - 1].score = value
      let updatedScore = +value + +this.state.totalScore
      this.setState({
          newScore
      })

      let PlayerScore = []
      this.state.score.map((value, index) => {
          PlayerScore.push( value.score )
      })
      this.setState({
          totalScore: PlayerScore.reduce((a, b) => +a + +b)
      })

      console.log(this.state.totalScore)
  }

  renderScoreList() {

      let Score = this.state.score.map((score, index) =>  {
          return <SingleScore data={score} key={index} id={index + 1} getScoreChange={(value, index) => this.getScore(value, index)}/>
      })
      
      return Score
  }
 
  render() {
    
    let ScoreList = this.renderScoreList()
    let totalScore = this.getScore

    return (
      <div className="App">
        <div className="App-header">
          <h2>Score</h2>
        </div>
        <p>Course Par: {this.state.coursePar}</p>
        <div>{ScoreList}</div>
        <div><span>Total Score: {this.state.totalScore}</span></div>
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