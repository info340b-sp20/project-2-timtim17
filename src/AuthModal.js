import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import AlertBar from './AlertBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      alert: {},
      showSpinner: false
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showSpinner: true });
    this.props.onSubmit(this.state.email, this.state.password)
      .then(this.props.onHide)
      .then(() => this.setState({
        email: '',
        password: '',
        alert: {}
      }))
      .catch(err => this.setState({alert: {type: 'danger', title: 'Error!', message: err.message}}))
      .finally(() => this.setState({ showSpinner: false }));
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <AlertBar alert={this.state.alert} />
            <Form.Group controlId="authEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="email@example.com" value={this.state.email} onChange={this.handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} aria-describedby="authPasswordHelp" required />
              <Form.Text id="authPasswordHelp">
                Your password must be at least 6 characters long.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            { this.state.showSpinner && <FontAwesomeIcon icon={faSpinner} pulse /> }
            <Button variant="primary" type="submit">{this.props.buttonText}</Button>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AuthModal;
