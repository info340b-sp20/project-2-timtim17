import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

class ErrorAlert extends Component {
  render() {
    return (
      <Alert variant="danger" show={this.props.errorMessage != null}>
        <Alert.Heading>Error!</Alert.Heading>
        <p>{this.props.errorMessage}</p>
      </Alert>
    );
  }
}

export default ErrorAlert;
