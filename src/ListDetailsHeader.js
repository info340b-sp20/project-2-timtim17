import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCogs} from '@fortawesome/free-solid-svg-icons';

class ListDetailsHeader extends Component {
  render() {
    return (
      <header className="d-flex justify-content-between align-items-center">
        <h1>{this.props.name}</h1>
        {
          this.props.isListAdmin &&
          <Button variant="secondary" onClick={this.props.showSettingsModal}><FontAwesomeIcon icon={faCogs} /> List Settings</Button>
        }
      </header>
    );
  }
}

export default ListDetailsHeader;
