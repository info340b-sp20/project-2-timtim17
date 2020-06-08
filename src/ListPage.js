import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from 'firebase/app';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      isLoading: true
    };
  }

  componentDidMount() {
    if (this.props.authReady) {
      this.updateGroups();
    }
  }

  componentDidUpdate(oldProps) {
    if (!oldProps.authReady && this.props.authReady) {
     this.updateGroups();
    }
  }

  updateGroups() {
    this.setState({isLoading: true});
    const handleDBError = error => this.props.handleError(new Error('Error connecting to database: ' + error));
    const dbRef = firebase.firestore().collection('users').doc(this.props.user.uid);
    dbRef.get()
      .then(doc => {
        if (doc.exists) {
          const promises = doc.data().groups.map(doc => doc.get());
          Promise.all(promises)
            .then(data => {
              const groups = data.map(doc => {
                const data = doc.data();
                return {link: '/group/' + doc.id, name: data.name, id: doc.id};
              });
              this.setState({groups: groups, isLoading: false});
            })
            .catch(handleDBError);
        } else {
          dbRef.set({groups: []}).catch(handleDBError);
        }
      })
      .catch(handleDBError);
  }

  render() {
    const rows = this.state.groups.map(group => <RowButton key={group.id} groupLink={group.link} groupName={group.name} />);
    return (
      <>
        {this.props.authReady && this.props.user === null && <Redirect to="/about" />}
        <h1>My Groups</h1>
        { this.state.isLoading ? <p>Loading... <FontAwesomeIcon icon={faSpinner} pulse /></p>
          : this.state.groups.length === 0 ? <p>No groups found... try gathering some friends and making one?</p> : rows }
      </>
    );
  }
}

class RowButton extends Component {
  render() {
    return (
      <Row>
        <ColButton groupLink={this.props.groupLink} groupName={this.props.groupName}/>  
      </Row>
    );
  }
}

class ColButton extends Component {
  render() {
    return (
      <Col>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ fontSize: '30px'}}>
              {this.props.groupName}
            </div>
            <Link to={this.props.groupLink}><Button variant="primary">Open List</Button></Link>
          </div>
      </Col>
    );
  }
}

export default ListPage;



