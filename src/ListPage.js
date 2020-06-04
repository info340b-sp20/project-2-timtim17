import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link, Redirect} from 'react-router-dom';

class ListPage extends Component {
  render() {
    return (
      <>
        {this.props.authReady && this.props.user === null && <Redirect to="/about" />}
        <h1>Home!</h1>
        <Link to="/group/GyThp0SJSNpfQkhBLpoL">Test link to a group</Link>
      </>
    );
  }
}

export default ListPage;



