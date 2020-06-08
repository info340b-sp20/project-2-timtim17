import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import AlertBar from './AlertBar';

class ListSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numVotes: 0,
      alert: {},
      showSpinner: false
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.setState({
        name: this.props.listName,
        numVotes: this.props.requiredVotes,
        alert: {}
      });
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSave = event => {
    event.preventDefault();
    this.setState({
      showSpinner: true
    });
    firebase.firestore().collection('groups').doc(this.props.groupId).set({
      name: this.state.name,
      votes_required: this.state.numVotes
    }, { merge: true })
      .then(this.props.handleClose())
      .catch(err => this.setState({alert: {type: 'danger', title: 'Error!', message: err.message}}))
      .finally(() => this.setState({ showSpinner: false }));
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List Settings</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSave}>
          <Modal.Body>
            <AlertBar alert={this.state.alert} />
            <Form.Group controlId="listSettingsName">
              <Form.Label>List Name</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.handleChange} name="name" required />
            </Form.Group>
            <Form.Group controlId="listSettingsVotes">
              <Form.Label>Required Upvotes</Form.Label>
              <Form.Control type="number" value={this.state.numVotes} onChange={this.handleChange} name="numVotes" min="0" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            { this.state.showSpinner && <FontAwesomeIcon icon={faSpinner} pulse /> }
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ListSettingsModal;

