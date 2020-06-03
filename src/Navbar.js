import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

class OurNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">App thing</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          {
            this.props.user &&
            <Navbar.Text>
              Signed in as: {this.props.user.email}
            </Navbar.Text>
          }
          <Nav>
            {
              this.props.user ?
              <Nav.Link onClick={this.props.handleSignOut}>Log Out</Nav.Link>
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
