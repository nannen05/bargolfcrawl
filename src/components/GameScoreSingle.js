import React, { Component } from 'react';

import '../App.css';
import '../css/flat-ui.css';

class GameScoreSingle extends Component {
    constructor(props) {
        super();

        this.state = {
            score: props.data.score,
            scoreResult: '',
            calculatedScore: '',
        }

        this.handleScoreChange.bind(this);
    }

    componentWillMount() {
        //Trigger handleScoreChange To Set scoreResult 
        //this.handleScoreChange(this.state.score)
        this.returnScoreText()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            score: nextProps.data.score
        })
    }

    returnScoreText() {
        const { par } = this.props
        const score  = this.props.data.score

        let scoreResult = ''

        if(score == 0) {
            scoreResult = 'Enter A Score'
        }
        if(score == par) {
            scoreResult = 'Par'
        } else if (score < par) {
            if(score == par - 1) {
                scoreResult = 'Birdie'
            } else if (score == par - 2) {
                scoreResult = 'Eagle'
            } else if (score == par - 3 && score == 0) {
                scoreResult = 'Enter A Score'
            }
        } else if (score > par) {
            if(score == par + 1) {
                scoreResult = 'Bogey'
            } else if (score == par + 2) {
                scoreResult = 'Double Bogey'
            } else {
                scoreResult = 'Try Again'
            }
        }

        this.setState({
            scoreResult
        })

    }

    handleScoreChange(e) {
        let scoreValue = e

        if(e.target) {
            e = e.target.value
            scoreValue = e
        }

        let scoreResult = ''

        if(e === "") {
            console.log("empty")
            scoreResult = ''
        }
        if(e == this.props.par) {
            scoreResult = 'Par'
        } else if (e < this.props.par) {
            if(e == this.props.par - 1) {
                scoreResult = 'Birdie'
            } else if (e == this.props.par - 2) {
                scoreResult = 'Eagle'
            } else if (e == this.props.par - 3) {
                scoreResult = 'Enter A Score'
            }
        } else if (e > this.props.par) {
            if(e == this.props.par + 1) {  
                scoreResult = 'Bogey'
            } else if (e == this.props.par + 2) {
                scoreResult = 'Double Bogey'
            } else {
                scoreResult = 'Try Again'
            }
        }
        this.setState({
            score: scoreValue,
            scoreResult: scoreResult,
            calculatedScore: scoreValue
        }, () => {
            this.props.getScoreChange(this.state.score, this.props.id);
        })

    }


    render() {
        const { score, scoreResult } = this.state
        return (
            <div className="form-group form-group-score">
                <label className="label-number" for="exampleInputEmail1"><span>{this.props.id}</span><span className="label-number-text">Hole</span></label>
                <label className="login-field-icon fui-question-circle"></label>
                <label className="label-result">
                    <span className="label-number-text">
                        {(scoreResult === 0 ) ? (
                            'Enter A Score'
                        ) : (
                            scoreResult
                        )}
                    </span>
                </label>
                <input
                    id={this.props.id}  
                    value={score}
                    onChange={e => this.handleScoreChange(e, this.props.id)}
                    onBlur={e => this.handleScoreChange(e, this.props.id)}
                    placeholder={"Score for Hole " + this.props.id}
                    type="text"
                    className="form-control"/>
            </div>
        )
    }
}

export default GameScoreSingle