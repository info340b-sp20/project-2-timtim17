import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListPage from './ListPage';
import AboutPage from './AboutPage';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import firebase from 'firebase/app';
import 'firebase/auth';
import AlertBar from './AlertBar';
import ListDetailsPage from './ListDetailsPage';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      alert: {},
      showSignUpModal: false,
      showSignInModal: false,
      authReady: false
    };
  } 

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        });
        this.flashAlert({title: 'Logged in!'});
      } else {
        this.setState({
          user: null
        });
      }
      if (!this.state.authReady) {
        this.setState({
          authReady: true
        });
      }
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
        .then(() => this.flashAlert({title: 'Logged out!', type: 'info'}))
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
      alert: {
        title: 'Error!',
        message: error.message,
        type: 'danger'
      }
    });
  }

  flashAlert({title, message='', type='success', delay=3000}) {
    this.setState({
      alert: {
        title: title,
        message: message,
        type: type
      }
    });
    setTimeout(() => this.setState({alert: {}}), delay);
  }

  render() {
    return (
      <Router>
        <Navbar user={this.state.user} handleSignOut={this.handleSignOut}
          handleSignUp={this.showSignUpModal} handleSignIn={this.showSignInModal} authReady={this.state.authReady} />
        <AlertBar alert={this.state.alert} />
        <Container className="mt-3 mb-3">
          <Switch>
            <Route exact path="/">
              <ListPage />
              {this.state.authReady && this.state.user === null && <Redirect to="/about" />}
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/group/:groupid">
              <ListDetailsPage user={this.state.user} handleError={this.handleError} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Container>
        <Footer />
        <AuthModal onSubmit={this.handleSignUp} show={this.state.showSignUpModal} onHide={this.hideSignUpModal} title="Sign up!" buttonText="Sign up" />
        <AuthModal onSubmit={this.handleSignIn} show={this.state.showSignInModal} onHide={this.hideSignInModal} title="Login!" buttonText="Login" />
      </Router>
    );
  }
}

export default App;
