import React from 'react';
import { Link } from "react-router-dom";
import './css/NavBar.css';

import FacebookLoginButton from './FacebookLoginButton';

const NavBar = ({ onFacebookLogin, isAuth, username }) => {
  return (
    <nav>
      <Link to="/"><div className="logo"><i className="fas fa-chart-pie faLogo"></i>YouVote</div></Link>
      <div className="right-side">

            <div>
              <FacebookLoginButton onLogin={ onFacebookLogin } isAuth={ isAuth } username={ username }>
                <button className="login-button"><i className="fab fa-facebook-square"></i><div className="fb-button-text welcome-main">Continue with facebook</div></button>
              </FacebookLoginButton>
            </div>

        <ul className="nav-ul"><Link to="/"><li className="nav-li">Home</li></Link><Link to="/explore"><li className="nav-li">Explore</li></Link><Link to="/my"><li className="nav-li">My Polls</li></Link><Link to="/about"><li className="nav-li">About</li></Link></ul>
        <MobileNavBar />
        
      </div>
    </nav>
    )
}

export default NavBar;

const MobileNavBar = () => {
  	return (
  	  	<div className="mobile-navbar" id="mobile-navbar">
  	  	  	<Link className="mobile-nav-button" to="/"><i className="far fa-edit"></i></Link>
  	  	  	<Link className="mobile-nav-button" to="/explore"><i className="fas fa-fire"></i></Link>
  	  	  	<Link className="mobile-nav-button" to="/my"><i className="far fa-user"></i></Link>
  	  	  	<Link className="mobile-nav-button" to="/about"><i className="far fa-comment-alt"></i></Link>
  	  	</div>
  	)
}