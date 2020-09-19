import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faSpinner} from '@fortawesome/free-solid-svg-icons';

class OurNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Group Movie List</Navbar.Brand>
        { !this.props.authReady && <Navbar.Text><FontAwesomeIcon icon={faSpinner} pulse /></Navbar.Text> }
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            {
              this.props.user !== null &&
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
              </>
            }
          </Nav>
          {
            this.props.user &&
            <Navbar.Text className="mr-2">
              Signed in as: {this.props.user.email}
            </Navbar.Text>
          }
          <Nav>
            {
              this.props.user ?
              <Nav.Link onClick={this.props.handleSignOut}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</Nav.Link>
              : <>
                  <Nav.Link onClick={this.props.handleSignIn}>Log In</Nav.Link>
                  <Nav.Link onClick={this.props.handleSignUp}>Sign Up</Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default OurNavbar;
