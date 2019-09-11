import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import NavagationTop from './NavagationTop';
import NavagationBottom from './NavagationBottom';

import '../App.css';
import '../css/flat-ui.css';

class GameChat extends Component {
    constructor(props) {
        super();

        this.state = {
            game: null,
            chat: [],
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
                            name: 'Score',
                            link: `/game/${this.props.match.params.game}/score/${firebase.auth.currentUser.uid}`, 
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
            // authUser
            //     ? this.setState({ authUser })
            //     : this.setState({ authUser: null });
        });

        db.getGame(this.props.match.params.game).then(snapshot =>
            this.setState({ game: snapshot.val() })
        );
        
    }

    render() {

        const { game, chat, authUser } = this.state

        //console.log(this.state)
    
        return (
          <div className="App">
              {(!!game && !!authUser) && 
                <div className="container">
                    <div className="row tile-header">
                        <div className="col">
                            <h3 className="tile-title">Chat</h3>
                            {!!this.state.navLinks && 
                                <NavagationTop links={this.state.navLinks} />
                            }
                        </div>
                    </div>
                    <div className="row tile">
                        <div className="col">
                            <h4 className="tile-title">{game.gameName}</h4>
                            <div className="form-group form-group-chat">
                                {chat.length === 0 ? (
                                    <div>Loading...</div>
                                ) : (
                                    <div>Chat...</div>
                                )}
                            </div>
                            <div className="form-group form-group-textarea">
                                <textarea rows="4">
                                
                                </textarea>
                            </div>
                            <div class="btn btn-block btn-lg btn-primary">SEND</div>
                        </div>
                    </div>
                </div>
              }
              {!!this.state.navLinks && 
                <NavagationBottom links={this.state.navLinks} />
              }
          </div>
        );
      }
}



const mapStateToProps = ({  }) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, actions)(GameChat));
