import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import FixedNavagationBottom from './FixedNavagationBottom';

import '../App.css';
import '../css/flat-ui.css';

class Game extends Component {
    constructor(props) {
        super();

        this.state = {
            game: null,
            authUser: null,
            navLinks: []
        }
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
            this.setState({
                navLinks: [
                    {
                        name: 'Home',
                        link: '/',
                        icon: 'fui-home',
                    },
                    {
                        name: 'Score',
                        link: `/game/${this.props.match.params.game}/score/${firebase.auth.currentUser.uid}`, 
                        //link: `/game/${this.props.match.params.game}/score/`, 
                        icon: 'fui-new',
                    },
                    {
                        name: 'Chat',
                        link: `/game/${this.props.match.params.game}/chat`, 
                        //link: `/game/${this.props.match.params.game}/score/`, 
                        icon: 'fui-chat',
                    },
                    {
                        name: 'Back',
                        link: `/games`,
                        icon: 'fui-arrow-left',
                    }
                ],
            })
        });

        db.getGame(this.props.match.params.game).then(snapshot =>
            this.setState({ game: snapshot.val() })
        );

        console.log(this.state)
    }

    render() {

        const { game, authUser } = this.state
    
        return (
          <div className="App">
              {(!!game && !!authUser) && 
                <div className="container">
                    <div className="row tile">
                        <div className="col">
                            <h4 className="tile-title">Game</h4>
                            <h3 className="tile-title">{game.gameName}</h3>
                            <div>
                                <Link to={`/game/${this.state.game.id}/score/${this.state.authUser.uid}`}>Edit Score</Link>
                            </div>
                            <div>
                                <Link to={`/game/${this.state.game.id}/scores`}>View Scores</Link>
                            </div>
                            <div>
                                <Link to={`/game/${this.state.game.id}/chat`}>Chat</Link>
                            </div>
                        </div>
                    </div>
                </div>
              }
              {!!this.state.navLinks && 
                <FixedNavagationBottom links={this.state.navLinks} />
              }
          </div>
        );
      }
}



const mapStateToProps = ({ game }) => {
  return {
    game
  };
};

export default withRouter(connect(mapStateToProps, actions)(Game));
