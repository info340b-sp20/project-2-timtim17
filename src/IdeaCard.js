import React, {Component} from 'react';
// import firebase from 'firebase/app';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class IdeaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Card>
        { this.props.idea.image && <Card.Img variant="top" src={this.props.idea.image} alt={'Art from ' + this.props.idea.title} /> }
        <Card.Body>
          <Card.Title>{this.props.idea.title}</Card.Title>
          { this.props.user ? <>
                                <Card.Link as={Button} variant="link">Upvote (1)</Card.Link>
                                { this.props.idea.createdBy === this.props.user.uid &&
                                  <Card.Link className="float-sm-right" as={Button} variant="link" onClick={() => this.props.handleRemove(this.props.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                  </Card.Link> }
                              </>
                            : <Card.Text>1 Upvote</Card.Text> }
        </Card.Body>
      </Card>
    );
  }
}

export default IdeaCard;
