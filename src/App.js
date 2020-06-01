import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListPage from './ListPage';
import AboutPage from './AboutPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">App thing</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar>
        <Container>
          <Switch>
            <Route exact path="/">
              <ListPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
