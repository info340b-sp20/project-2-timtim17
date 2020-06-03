import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

class ErrorAlert extends Component {
  render() {
    return (
      <>
        {
          this.props.errorMessage != null &&
          <Alert variant="danger">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{this.props.errorMessage}</p>
          </Alert>
        }
      </>
    );
  }
}

export default ErrorAlert;
