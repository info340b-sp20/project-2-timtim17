import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import ErrorAlert from './ErrorAlert';

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
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
        errorMessage: null
      }))
      .catch(err => this.setState({errorMessage: err.message}));
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorAlert errorMessage={this.state.errorMessage} />
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
