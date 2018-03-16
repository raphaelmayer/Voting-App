import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLoginButton from './FacebookLoginButton';

class NavBar extends Component {
	constructor() {
		super()
	}

	render() {
		return (
        <nav>
          <Link to="/"><div className="logo"><i class="fas fa-chart-pie faLogo"></i>YouVote</div></Link>
          <div className="right-side">

                <div>
                  <FacebookLoginButton onLogin={this.onFacebookLogin} isAuth={this.state.isAuth} username={this.state.username}>
                    <button className="login-button"><i className="fab fa-facebook-square"></i><div className="fb-button-text">Continue with Facebook</div></button>
                  </FacebookLoginButton>
                </div>

            <ul className="nav-ul"><Link to="/"><li className="nav-li">Home</li></Link><Link to="/explore"><li className="nav-li">Explore</li></Link><Link to="/my"><li className="nav-li">My Polls</li></Link><Link to="/about"><li className="nav-li">About</li></Link></ul>
            <div onClick={this.handleNavButton}><i className="fas fa-bars nav-button"></i></div>
          </div>

          { this.props.toggleNav ? <div className="mobile-navbar" id="mobile-navbar">mobile-navbar</div> : null }

        </nav>
        )
	}
}

export default NavBar;