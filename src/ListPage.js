import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getFirestore, doc, onSnapshot, getDoc} from 'firebase/firestore';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faPlus} from '@fortawesome/free-solid-svg-icons';
import CreateModal from './CreateModal';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      isLoading: true,
      showCreateModal: false
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

  componentWillUnmount() {
    if (this.unsubscribeDB) {
      this.unsubscribeDB();
    }
  }

  async updateGroups() {
    if (this.props.user) {
      this.setState({isLoading: true});
      const handleDBError = error => this.props.handleError(new Error('Error connecting to database: ' + error));
      const dbRef = doc(getFirestore(), 'users', this.props.user.uid);
      this.unsubscribeDB = onSnapshot(dbRef, doc => {
        if (doc.exists) {
          const promises = doc.data().groups.map(getDoc);
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
      }, handleDBError);
    }
  }

  showCreateModal = () => {
    this.setState({showCreateModal: true});
  }

  hideCreateModal = () => {
    this.setState({showCreateModal: false});
  }

  render() {
    const rows = this.state.groups.map(group => <RowButton key={group.id} groupLink={group.link} groupName={group.name} />);
    return (
      <>
        {this.props.authReady && this.props.user === null && <Redirect to="/about" />}
        <header className="d-flex justify-content-between align-items-center">
          <h1>My Groups</h1>
          <Button variant="outline-secondary" onClick={this.showCreateModal}><FontAwesomeIcon icon={faPlus} /> Create Group</Button>
        </header>
        { this.state.isLoading ? <p>Loading... <FontAwesomeIcon icon={faSpinner} pulse /></p>
          : this.state.groups.length === 0 ? <p>No groups found... try gathering some friends and making one?</p> : rows }
        <CreateModal show={this.state.showCreateModal} handleHide={this.hideCreateModal} uid={this.props.user?.uid} />
      </>
    );
  }
}

class RowButton extends Component {
  render() {
    return (
      <Row className="mb-1">
        <ColButton groupLink={this.props.groupLink} groupName={this.props.groupName}/>  
      </Row>
    );
  }
}

class ColButton extends Component {
  render() {
    return (
      <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p style={{fontSize: '30px', marginBottom: 0}}>{this.props.groupName}</p>
              <Link to={this.props.groupLink}>{window.location.hostname + this.props.groupLink}</Link>
            </div>
            <Button variant="primary" as={Link} to={this.props.groupLink}>Open List</Button>
          </div>
      </Col>
    );
  }
}

export default ListPage;



