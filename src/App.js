import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListPage from './ListPage';
import AboutPage from './AboutPage';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
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
