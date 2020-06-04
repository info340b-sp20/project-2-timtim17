import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';
import _ from 'lodash';

class AlertBar extends Component {
  render() {
    return (
      <Alert variant={this.props.alert.type} show={!_.isEmpty(this.props.alert)}>
        <Alert.Heading>{this.props.alert.title}</Alert.Heading>
        <p>{this.props.alert.message}</p>
      </Alert>
    );
  }
}

export default AlertBar;
