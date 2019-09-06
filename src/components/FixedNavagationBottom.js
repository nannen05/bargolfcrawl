import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions";
import { db, firebase } from '../firebase'

import '../App.css';
import '../css/fixed-nav.css';

class FixedNavagationBottom extends Component {
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
            <div className="fixed-nav-bottom">
                {!!this.props.links &&
                    this.props.links.map((value, index) => {
                        if(this.props.links[index].icon) {
                            return <Link key={index} to={this.props.links[index].link}><span className={this.props.links[index].icon}></span></Link>
                        } else {
                            return <Link to={this.props.links[index].link}><p key={index}>{this.props.links[index].name}</p></Link>
                        }
                    })
                }
            </div>
        );
      }
}



const mapStateToProps = ({}) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, actions)(FixedNavagationBottom));
