import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCogs, faRandom} from '@fortawesome/free-solid-svg-icons';

class ListDetailsHeader extends Component {
  render() {
    return (
      <header className="d-flex justify-content-between align-items-center">
        <h1>{this.props.name}</h1>
        <div>
          <Button variant="info" disabled={!this.props.canPickRandom} onClick={this.props.handlePickRandom}><FontAwesomeIcon icon={faRandom} /> Pick an Idea!</Button>
          {
            this.props.isListAdmin &&
            <Button variant="secondary" className="ml-1" onClick={this.props.showSettingsModal}><FontAwesomeIcon icon={faCogs} /> List Settings</Button>
          }
        </div>
      </header>
    );
  }
}

export default ListDetailsHeader;
