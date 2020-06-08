import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class PickedModal extends Component {
  render() {
    return (
      <Modal onHide={this.props.handleHide} show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Picked one!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>
          { this.props.pick?.image && <img src={this.props.pick.image} alt={'Art from ' + this.props.pick.title} style={{width: '100%'}} /> }
          <h2>{this.props.pick?.title}</h2>
          <p>With {this.props.pick?.upvotedBy.length} upvotes!</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PickedModal;
