import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import NavBar from './NavBar';
import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom'

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
                            icon: 'fui-document',
                        },
                        {
                            name: 'Score',
                            link: `/game/${this.props.match.params.game}/score/${firebase.auth.currentUser.uid}`, 
                            icon: 'fui-new',
                        },
                        {
                            name: 'Rules',
                            link: `/game/${this.props.match.params.game}/courserules`, 
                            icon: 'fui-question-circle',
                        },
                        {
                            name: 'Chat',
                            link: `/game/${this.props.match.params.game}/chat`, 
                            icon: 'fui-chat',
                        },
                        {
                            name: 'Back',
                            link: `/games`,
                            icon: 'fui-arrow-left',
                        }
                    ],
                })
            }
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
              <NavBar />
              {(!!game && !!authUser) && 
                <div className="container">
                    <div className="row tile game">
                        <div className="col">
                            <h3 className="tile-title">{game.gameName}</h3>
                            {!!this.state.navLinks && 
                                <NavagationTop links={this.state.navLinks} />
                            }
                        </div>
                    </div>
                    { 
                    // <div className="row tile">
                    //     <div className="col">
                    //         <h4 className="tile-title">Game</h4>
                    //         <h3 className="tile-title">{game.gameName}</h3>
                    //         <div className="btn btn-block btn-lg btn-primary">
                    //             <Link to={`/game/${this.state.game.id}/score/${this.state.authUser.uid}`}>Edit Score</Link>
                    //         </div>
                    //         <div className="btn btn-block btn-lg btn-primary">
                    //             <Link to={`/game/${this.state.game.id}/scores`}>Scores</Link>
                    //         </div>
                    //         <div className="btn btn-block btn-lg btn-primary">
                    //             <Link to={`/game/${this.state.game.id}/courserules`}>Course Rules</Link>
                    //         </div>
                    //         {
                    //         <div className="btn btn-block btn-lg btn-default disabled">
                    //             <Link to={`/game/${this.state.game.id}/chat`}>Chat</Link>
                    //         </div>
                    //         }
                    //     </div>
                    // </div>
                    }
                </div>
              }
              {
                //!!this.state.navLinks && 
                //<NavagationBottom links={this.state.navLinks} />
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
