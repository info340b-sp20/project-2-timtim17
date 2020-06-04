import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class IdeaCard extends Component {
  upvote = () => {
    firebase.firestore().collection('groups').doc(this.props.gid)
      .collection('ideas').doc(this.props.idea.id).set({
        upvotedBy: [...this.props.idea.upvotedBy, this.props.user.uid]
      }, {merge: true});
  }

  render() {
    return (
      <Card>
        { this.props.idea.image && <Card.Img variant="top" src={this.props.idea.image} alt={'Art from ' + this.props.idea.title} /> }
        <Card.Body>
          <Card.Title>{this.props.idea.title}</Card.Title>
          { this.props.user ? <>
                                { this.props.idea.upvotedBy.includes(this.props.user.uid) ? <Card.Link>Upvoted! ({this.props.idea.upvotedBy.length})</Card.Link>
                                                                                          : <Card.Link as={Button} variant="link" onClick={this.upvote}>Upvote ({this.props.idea.upvotedBy.length})</Card.Link> }
                                { (this.props.idea.createdBy === this.props.user.uid || this.props.adminUID === this.props.user.uid) &&
                                  <Card.Link className="float-right" as={Button} variant="link" onClick={() => this.props.handleRemove(this.props.idea.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                  </Card.Link> }
                              </>
                            : <Card.Text>{this.props.idea.upvotedBy.length} Upvote{this.props.idea.upvotedBy.length !== 1 && 's'}</Card.Text> }
        </Card.Body>
      </Card>
    );
  }
}

export default IdeaCard;
