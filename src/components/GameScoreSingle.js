import React, { Component } from 'react';

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

export default GameScoreSingle