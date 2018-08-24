import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../store/actions";
import { db, auth, firebase } from '../../firebase'
import '../../App.css';
import logo from '../../logo.svg';

console.log(auth)

const INITIAL_STATE = {
  bar: '',
  holeTime: '',
  parScore: '',
  eagle: '',
  birdie: '',
  par: '',
  bogey: '',
  error: null,
};

class AddHole extends Component {
  constructor(props) {
      super(props);

      this.state = {
      	  authUser: null,	
          holes: null,
          formData: {...INITIAL_STATE},
          courseRules: null
      }

      console.log(this.props)
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  addHole = (e) => {
  	e.preventDefault()

  	console.log(this.state.formData)

  	db.addHole(this.state.authUser.uid , this.props.match.params.game, this.state.formData)

	this.setState({
	  	formData : {...INITIAL_STATE}
	})
  }

  handleChange(e) {        
    this.setState({
	        formData : {...this.state.formData, [e.target.name]: e.target.value}
	 })
  }

  render() {

  	const {
      bar,
      holeTime,
      parScore,
      eagle,
      birdie,
      par,
      bogey
    } = this.state.formData

    let formData = {...this.state.formData};

    let gameLink = ""

    //console.log(gameLink)

  	  return(
  	  	<div className="App">
  	  		{ !!this.state.authUser && this.state.courseRules }
	  	  	<form onSubmit={this.addHole}>
	  	  		<input name="bar" type="text" placeholder="Bar" value={this.state.formData.bar} 
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<input name="holeTime" type="text" placeholder="Hole Time" value={this.state.formData.holeTime}
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<input name="parScore" type="text" placeholder="Par Score" value={this.state.formData.parScore}
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<input name="eagle" type="text" placeholder="Eagle" value={this.state.formData.eagle}
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<input name="birdie" type="text" placeholder="Birdie" value={this.state.formData.birdie}
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<input name="par" type="text" placeholder="Par" value={this.state.formData.par} 
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<input name="bogey" type="text" placeholder="Bogey" value={this.state.formData.bogey}
	  	  			onChange={event => this.handleChange(event)}/>
	  	  		<button type="submit">
	                Add Hole
	             </button>
	  	  		<div className="btn"><a href="#" type="submit">View Holes</a></div>
            { !!this.state.authUser && <div className="btn"><Link to={"/games/" + this.state.authUser.uid }> Back to Games </Link></div> }
            
  	  		</form>
  	  	</div>
  	  )
  }
}

export default AddHole;