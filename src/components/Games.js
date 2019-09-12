import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db } from '../firebase'

import NavBar from './NavBar';
import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom'

import '../App.css';
import '../css/flat-ui.css';

class Games extends Component {
    constructor(props) {
        super();

        this.state = {
            games: null,
            navLinks: [],
        }
    }

    componentDidMount() {
        console.log(this.props)
        db.getGames().then(snapshot =>
            this.setState({ games: snapshot.val() })
        );

        this.setState({
          navLinks: [
              {
                  name: 'Home',
                  link: '/',
                  icon: 'fui-home',
              }
          ],
      })
    }

    createGameStartDate(dateUTC) {
      let date = new Date(dateUTC); 
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    createGameTimeDate(dateUTC) {
      let date = new Date(dateUTC);
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    render() {
        var settings = {
          dots: true,
          arrows: false,
          //fade: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          centerMode: true,
          //centerPadding: 40,
        };
    
        const { games } = this.state
    
        return (
          <div className="App">
            <NavBar/>
            <div className="container">
              <div className="row tile-header">
                  <div className="col">
                      <h3 className="tile-title">Games</h3>
                      {!!this.state.navLinks && 
                          <NavagationTop links={this.state.navLinks} />
                      }
                  </div>
              </div>
              <div className="row tile">
                <div className="slider">
                {!!games && 
                    <Slider {...settings}>
                      {Object.keys(games).map(key =>
                        <div key={key} className="slide">
                          <div className="form-group form-group-slide">
                            <div>{games[key].gameName}</div>
                            <div>{this.createGameStartDate(games[key].gameDate)}</div>
                            <div>{this.createGameTimeDate(games[key].gameStartTime)}</div>
                            <div className="center"><Link className="btn btn-block btn-lg btn-primary" to={`/game/${games[key].id}`}> Join Game </Link></div>
                          </div>
                        </div>
                      )}
                    </Slider>
                }
                </div>
              </div>
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
