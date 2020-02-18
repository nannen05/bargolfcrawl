import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../store/actions";

import '../App.css';
import '../css/flat-ui.css';

class NavBar extends React.Component {
    constructor(props) {
        super();
  
        this.state = {
            rules: null,
        }
    }

    render() {
        return (
            <div className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Bar Golf</a>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = ({  }) => {
    return {
      
    };
  };
  
  export default withRouter(connect(mapStateToProps, actions)(NavBar));