import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db } from '../firebase'
import '../App.css';
import logo from '../logo.svg';

class RuleSlider extends React.Component {
  constructor(props) {
      super();

      this.state = {
          rules: null,
      }
  }

  componentDidMount() {
    db.getCourseRules().then(snapshot =>
      this.setState({ rules: snapshot.val() })
    );
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
                  <div className="center"><span>Hole: </span>{rules[key].hole}</div>
                  <div className="center"><span>Time: </span>{rules[key].holeTime}</div>
                  <div className="center"><span>Bar: </span>{rules[key].bar}</div>
                  <div className="center"><span>Hole Par: </span>{rules[key].parScore}</div>
                  <div className="center"><span>Eagle: </span>{rules[key].eagle}</div>
                  <div className="center"><span>Birdie: </span>{rules[key].birdie}</div>
                  <div className="center"><span>Par: </span>{rules[key].par}</div>
                  <div className="center"><span>Bogey: </span>{rules[key].bogey}</div>
                </div>
              )}
            </Slider>
        }
      </div>
    );
  }
}

class Course extends Component {
    constructor(props) {
        super();

        this.state = {
            rules: null,
        }
    }

    componentDidMount() {
        this.props.fetchCourseRules()

        this.setState({
            rules: this.props.courseRules
        })
    }

    render() {

      const { courseRules } = this.props.courseRules

        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Course Rules</h2>
            </div>
            <div className="slider">
             <RuleSlider data={this.props.courseRules}/> 
            </div>
            <div className="App-login">
                <div className="btn"><Link to="/"> Home </Link></div>
                <div className="btn"><Link to="/scores"> Scores </Link></div>
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

export default withRouter(connect(mapStateToProps, actions)(Course));
