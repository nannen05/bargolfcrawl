import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db } from '../firebase'
import '../App.css';
import logo from '../logo.svg';

class Games extends Component {
    constructor(props) {
        super();

        this.state = {
            games: null
        }
    }

    componentDidMount() {
        console.log(this.props)
        db.getGames().then(snapshot =>
            this.setState({ games: snapshot.val() })
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
    
        const { games } = this.state
    
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Gamess</h2>
            </div>
            <div className="slider">
            {!!games && 
                <Slider {...settings}>
                  {Object.keys(games).map(key =>
                    <div key={key} className="">
                      <div className="center"><span>Name: </span>{games[key].gameName}</div>
                      <div className="center"><span>Date: </span>{games[key].gameDate}</div>
                      <div className="center"><span>Start Time: </span>{games[key].gameStartTime}</div>
                      <div className="center"><Link to={`/game/${games[key].id}`}> Join Game </Link></div>
                    </div>
                  )}
                </Slider>
            }
            </div>
          </div>
        );
      }
}



const mapStateToProps = ({ games }) => {
  return {
    games
  };
};

export default withRouter(connect(mapStateToProps, actions)(Games));
