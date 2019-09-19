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
            user: null,
            userID: null,
            authUser: null,
            navLinks: [],
            messages: []
        }
        
    }

    componentDidMount() {
        const { game } = this.props.match.params

        firebase.auth.onAuthStateChanged(authUser => {
            if(firebase.auth.currentUser) {
                
                // Get Current User
                db.getCurrentUser(firebase.auth.currentUser.uid).on("value", snapshot => {
                    this.setState({ user: snapshot.val(), userID: firebase.auth.currentUser.uid })
                })

                db.getGameChat(game)
                    .onSnapshot(querySnapshot => {
                        
                        querySnapshot.docChanges().forEach(change => {
                            if(change.type === 'added') {
                                let doc = change.doc
                                let messageData = {
                                    id: doc.id,
                                    username: doc.data().username,
                                    content: doc.data().content,
                                    timestamp: doc.data().timestamp
                                }
                                let messages = [...this.state.messages];
                                messages.push(messageData);
                                this.setState({ messages });  
                            }
                        });
                    });

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
                            icon: 'fui-new',
                        },
                        {
                            name: 'Back',
                            link: `/game/${this.props.match.params.game}/`,
                            icon: 'fui-arrow-left',
                        }
                    ],
                })

                console.log('chat state', this.state)
            }
        });

        db.getGame(game).then(snapshot =>
            this.setState({ game: snapshot.val() })
        );
        
    }

    handleSubmit(e) {
        const { game, user, message } = this.state;

        const data = {
            game: game.id,
            username: user.username,
            message: message
        }

        db.addGameMessage(game.id, user.username, message)

        e.preventDefault();
    }

    renderMessages() {
        const { messages } = this.state 

        return messages.map((value, index) => {
            return <div key={index} className=""><div className="form-group-col">{value.content}</div><div className="form-group-col">{value.timestamp}</div></div>
        })


    }

    render() {

        const { game, messages, authUser, user } = this.state
    
        return (
          <div className="App">
              {(!!game && !!authUser &&!!user) && 
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
                                {messages.length === 0 ? (
                                    <div>Loading...</div>
                                ) : (
                                    <div>{this.renderMessages()}</div>
                                )}
                            </div>
                            <form>
                                <div className="form-group form-group-textarea">
                                    <textarea rows="4"  onChange={event => this.setState({ message: event.target.value })}>
                                    
                                    </textarea>
                                </div>
                                <div onClick={e => this.handleSubmit(e)}  
                                     class="btn btn-block btn-lg btn-primary">
                                    SEND
                                </div>
                            </form>
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
