import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

class AlertBar extends Component {
  render() {
    return (
      <Alert variant={this.props.alert.type} show={Object.keys(this.props.alert).length !== 0}>
        <Alert.Heading>{this.props.alert.title}</Alert.Heading>
        <p>{this.props.alert.message}</p>
      </Alert>
    );
  }
}

export default AlertBar;
