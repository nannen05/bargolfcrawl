import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom';

import '../App.css';
import '../css/flat-ui.css';

class RuleSlider extends React.Component {
  constructor(props) {
      super();

      this.state = {
          rules: null,
      }
  }

  componentDidMount() {
    
      this.setState({ rules: this.props.data })

  }

  render() {
    var settings = {
      dots: true,
      arrows: false,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    };

    const { rules } = this.state

    return (
      <div>
        {!!rules && 
           <Slider {...settings}>
              {Object.keys(rules).map(key =>
                <div key={key} className="">
                  <div className="center"><span>Hole: </span>{rules[key].holeNumber}</div>
                  <div className="center"><span>Time: </span>{rules[key].time}</div>
                  <div className="center"><span>Bar: </span>{rules[key].bar}</div>
                  <div className="center"><span>Hole Par: </span>{rules[key].parScore}</div>
                  <div className="center"><span>Eagle: </span>{rules[key].eagle}</div>
                  <div className="center"><span>Birdie: </span>{rules[key].birdie}</div>
                  <div className="center"><span>Par: </span>{rules[key].par}</div>
                  <div className="center"><span>Bogey: </span>{rules[key].bogey}</div>
                  <div className="center"><span>Doulbe Bogey: </span>{rules[key].doubleBogey}</div>
                </div>
              )}
            </Slider>
        }
      </div>
    );
  }
}

class GameRules extends Component {
    constructor(props) {
        super();

        this.state = {
            rules: null,
            navLinks: []
        }
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            if(firebase.auth.currentUser) {
                this.setState({ authUser: firebase.auth.currentUser })
                this.setState({
                    navLinks: [
                        {
                            name: 'Home',
                            link: '/',
                            icon: 'fui-home',
                        },
                        {
                            name: 'Scores',
                            link: `/game/${this.props.match.params.game}/scores/`, 
                            //link: `/game/${this.props.match.params.game}/score/`, 
                            icon: 'fui-document',
                        },
                        {
                            name: 'Score',
                            link: `/game/${this.props.match.params.gam}/score/${firebase.auth.currentUser.uid}`, 
                            //link: `/game/${this.props.match.params.game}/score/`, 
                            icon: 'fui-new',
                        },
                        {
                            name: 'Back',
                            link: `/game/${this.props.match.params.game}/`,
                            icon: 'fui-arrow-left',
                        }
                    ],
                })
            }
        });

        db.getGameRules(this.props.match.params.game)
            .then(res => {
                this.setState({
                    rules: res
                })
            })
    }

    render() {

      const { rules } = this.state

        return (
          <div className="App">
             <div className="container">
                <div className="row tile-header">
                    <div className="col">
                        <h3 className="tile-title">Game Rules</h3>
                        {!!this.state.navLinks && 
                            <NavagationTop links={this.state.navLinks} />
                        }
                    </div>
                </div>
            </div>
            <div className="row tile">
                <div className="slider">
                {!!rules && 
                   <RuleSlider data={rules}/> 
                }
                </div>
            </div>
          </div>
        )
    }
}



const mapStateToProps = ({ courseRules }) => {
  return {
    courseRules
  };
};

export default withRouter(connect(mapStateToProps, actions)(GameRules));
