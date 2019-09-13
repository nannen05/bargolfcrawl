import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { auth  } from '../firebase'

import '../App.css';
import '../css/fixed-nav.css';

class NavagationTop extends Component {
    constructor(props) {
        super();

        this.state = {
            links: []
        }
    }

    componentDidMount() {
        this.setState({
            link: this.props.links
        })
    }

    render() {    
        return (
                <div>
                {!!this.props.links && (
                    <div className={(this.props.links.length > 3 ? 'top-nav-links flex-wrap': 'top-nav-links')}>
                        {
                            this.props.links.map((value, index) => {
                            if(this.props.links[index].icon) {
                                if(this.props.links[index].name === 'Sign Out') {
                                    return   <a href="#" key={index} className="" type="button" onClick={auth.doSignOut}>
                                                <span className={this.props.links[index].icon}></span>
                                                <span className="text">{this.props.links[index].name}</span>
                                            </a>
                                } else {
                                    return <Link key={index} to={this.props.links[index].link}>
                                                <span className={this.props.links[index].icon}></span>
                                                <span className="text">{this.props.links[index].name}</span>
                                            </Link>
                                }
                            } else {
                                return <Link to={this.props.links[index].link}><p key={index}>{this.props.links[index].name}</p></Link>
                            }
                            })
                        }
                    </div>
                )}
                </div>
        );
      }
}



const mapStateToProps = ({}) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, actions)(NavagationTop));
