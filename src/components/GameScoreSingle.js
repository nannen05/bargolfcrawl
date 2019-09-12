import React, { Component } from 'react';
import Modal from 'react-modal';

import '../App.css';
import '../css/flat-ui.css';
import '../css/modal.css';

Modal.setAppElement('#root')

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      maxWidth              : '80%',
      width                 : '80%',
      zIndex                : 10
    }
  };

class GameScoreSingle extends Component {
    constructor(props) {
        super();

        this.state = {
            rule: props.rule,
            score: props.data.score,
            scoreResult: '',
            calculatedScore: '',

            modalIsOpen: false
        }

        this.handleScoreChange.bind(this);

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        //Trigger handleScoreChange To Set scoreResult 
        //this.handleScoreChange(this.state.score)
        this.returnScoreText()
        console.log(this.state.rule)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            score: nextProps.data.score
        })
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
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
        const { rule, score, scoreResult } = this.state
        return (
            <div className="form-group form-group-score">
                <label className="label-number" for="exampleInputEmail1"><span>{this.props.id}</span><span className="label-number-text">Hole</span></label>
                <label 
                    onClick={this.openModal}
                    className="login-field-icon fui-question-circle">
                </label>
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

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <button onClick={this.closeModal} className="close fui-cross"></button>
                    <div className="">
                        {!!rule.holeNumber && (
                            <div className="rule-title">Hole  //  {rule.holeNumber}</div>
                        )}
                        {!!rule.bar && (
                            <div className="rule-title">Bar //  {rule.bar}</div>
                        )}
                        {!!rule.time && (
                            <div className="rule-title">Time  //  {rule.time}</div>
                        )}
                        {!!rule.parScore && (
                            <div className="rule-title">Par  //  {rule.parScore}</div>     
                        )}
                        
                        <div class="rules">
                            <div className="rule-title">Rules</div>
                            {!!rule.eagle && (
                                <div className="rule">
                                    <span>Eagle </span>
                                    {rule.eagle}
                                </div>
                            )}
                            {!!rule.birdie && (
                                <div className="rule">
                                    <span>Birdie </span>
                                    {rule.birdie}
                                </div>
                            )}
                            {!!rule.par && (
                                <div className="rule">
                                    <span>Par </span>
                                    {rule.par}
                                </div>
                            )}
                            {!!rule.bogey && (
                                <div className="rule">
                                    <span>Bogey </span>
                                    {rule.bogey}
                                </div>
                            )}
                            {!!rule.doubleBogey && (
                                <div className="rule">
                                    <span>Double Bogey </span>
                                    {rule.doubleBogey}
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default GameScoreSingle