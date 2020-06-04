import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ListPage extends Component {
  render() {
    let links = ["/group/GyThp0SJSNpfQkhBLpoL"];
    let groupName = ["Group 1"];
    return (
      <Container>
        {this.props.authReady && this.props.user === null && <Redirect to="/about" />}
        <h1>My Groups</h1>
        <RowButton groupLink={links} groupName={groupName}/>

      </Container>
    );
  }
}

class RowButton extends Component {
  render() {
    return (
      <Row>
        <ColButton groupLink={this.props.groupLink[0]} groupName={this.props.groupName[0]}/>  
      </Row>
    );
  }
}

class ColButton extends Component {
  render() {
    return (
      <Col>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              {this.props.groupName}
            <Link to={this.props.groupLink}><Button variant="primary">Open List</Button></Link>
          </div>
      </Col>
    );
  }
}

export default ListPage;



