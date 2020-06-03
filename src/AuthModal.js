import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import AlertBar from './AlertBar';

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      alert: {}
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password)
      .then(this.props.onHide)
      .then(() => this.setState({
        email: '',
        password: '',
        alert: {}
      }))
      .catch(err => this.setState({alert: {type: 'danger', title: 'Error!', message: err.message}}));
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AlertBar alert={this.state.alert} />
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <button>{this.props.buttonText}</button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;
