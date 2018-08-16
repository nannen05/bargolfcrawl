import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const SignOutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>


const Navigation = ({ authUser }) =>
  
  <div>
  	{console.log(authUser)}
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul>
    <li><Link to={"/"}>Landing</Link></li>
    <li><Link to={"/"}>Home</Link></li>
    <li><Link to={"/"}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={"/"}>Landing</Link></li>
    <li><Link to={"/signin"}>Sign In</Link></li>
  </ul>

export default Navigation;