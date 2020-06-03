import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListPage from './ListPage';
import AboutPage from './AboutPage';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import firebase from 'firebase/app';
import 'firebase/auth';
import ErrorAlert from './ErrorAlert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      errorMessage: null,
      showSignUpModal: false,
      showSignInModal: false
    };
  } 

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user ? user : null,
        errorMessage: null
      });
    });
  }

  /**
   * @param {string} email - Email for the new user
   * @param {string} pass - Password for the new user
   */
  handleSignUp = (email, pass) => {
    return firebase.auth().createUserWithEmailAndPassword(email, pass);
  }

  handleSignIn = (email, pass) => {
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  }

  handleSignOut = () => {
    if (this.state.user) {
      firebase.auth().signOut()
        .catch(this.handleError);
    }
  }

  showSignUpModal = () => {
    this.setState({
      showSignUpModal: true
    });
  }

  hideSignUpModal = () => {
    this.setState({
      showSignUpModal: false
    });
  }

  showSignInModal = () => {
    this.setState({
      showSignInModal: true
    });
  }

  hideSignInModal = () => {
    this.setState({
      showSignInModal: false
    });
  }

  handleError = error => {
    this.setState({
      errorMessage: error.message
    });
  }

  render() {
    return (
      <Router>
        <Navbar user={this.state.user} handleSignOut={this.handleSignOut} handleSignUp={this.showSignUpModal} handleSignIn={this.showSignInModal} />
        <ErrorAlert errorMessage={this.state.errorMessage} />
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
        <AuthModal onSubmit={this.handleSignUp} show={this.state.showSignUpModal} onHide={this.hideSignUpModal} title="Sign up!" buttonText="Sign up" />
        <AuthModal onSubmit={this.handleSignIn} show={this.state.showSignInModal} onHide={this.hideSignInModal} title="Login!" buttonText="Login" />
      </Router>
    );
  }
}

export default App;
