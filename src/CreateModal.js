import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from 'firebase/app';
import AlertBar from './AlertBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

class CreateModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <ModalContents handleHide={this.props.handleHide} uid={this.props.uid} />
      </Modal>
    );
  }
}

class ModalContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupCreated: false,
      alert: {},
      showSpinner: false,
      groupId: null,
      name: '',
      numVotes: 1
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      showSpinner: true
    });
    const db = firebase.firestore();
    const docRef = db.collection('groups').doc();
    const handleDBError = err => this.setState({ alert: { type: 'danger', title: 'Error!', message: err.message } });
    docRef.set({
      name: this.state.name,
      votes_required: this.state.numVotes,
      admin_uid: this.props.uid
    })
      .then(() => {
        const userDBRef = db.collection('users').doc(this.props.uid);
        return userDBRef.get().then(doc => {
          if (doc.exists && doc.data().groups) {
            const curGroups = doc.data().groups;
            if (!curGroups) {
              userDBRef.set({groups:[docRef]});
            } else if(!_.find(curGroups, group => group.id === docRef)) {
              userDBRef.set({groups:[...curGroups, docRef]});
            }
          } else {
            userDBRef.set({groups:[docRef]});
          }
        });
      })
      .then(() => this.setState({groupCreated: true, groupId: docRef.id}))
      .catch(handleDBError)
      .finally(() => this.setState({ showSpinner: false }));
  }

  render() {
    if (!this.state.groupCreated) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <AlertBar alert={this.state.alert} />
            <Form.Group controlId="createListName">
              <Form.Label>List Name</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.handleChange} name="name" required placeholder="Group Name" />
            </Form.Group>
            <Form.Group controlId="createListVotes">
              <Form.Label>Required Upvotes</Form.Label>
              <Form.Control type="number" value={this.state.numVotes} onChange={this.handleChange} name="numVotes" min="0" required />
              <Form.Text className="text-muted">The number of upvotes for an idea to be considered as one of the random choices.</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            { this.state.showSpinner && <FontAwesomeIcon icon={faSpinner} pulse /> }
            <Button type="submit">Create</Button>
            <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
          </Modal.Footer>
        </Form>
      );
    } else {
      return (
        <>
          <Modal.Body style={{textAlign: 'center'}}>
            <h2>New group created!</h2>
            <p>Share this link with your friends:</p>
            <a href={'/group/' + this.state.groupId}>{window.location.hostname + '/group/' + this.state.groupId}</a>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
          </Modal.Footer>
        </>
      );
    }
  }
}

export default CreateModal;
