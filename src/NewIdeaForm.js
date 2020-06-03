import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

class NewIdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestTitle: '',
      showSpinner: false
    };
  }

  componentDidMount() {

  }

  onSuggestChange = event => {
    this.setState({
      suggestTitle: event.target.value
    });
  }

  handleSuggestSubmit = event => {
    event.preventDefault();
    this.setState({
      showSpinner: true
    });
    this.props.handleAdd(this.state.suggestTitle)
      .then(() => this.setState({ suggestTitle: '' }))
      .catch(this.props.handleError)
      .finally(() => this.setState({ showSpinner: false }));
  }

  render() {
    return (
      <section id="suggest-idea-form">
        <h2 className="mb-2">Suggest an Idea!</h2>
        {
          this.props.user ?
          <Form onSubmit={this.handleSuggestSubmit}>
            <Form.Group as={Row}>
              <Col sm={4}>
                <Form.Control type="text" placeholder="Suggest a title!" onChange={this.onSuggestChange} value={this.state.suggestTitle} required />
              </Col>
              <Col sm={2}>
                <Button variant="primary" type="submit">Suggest!</Button>
                { this.state.showSpinner && <FontAwesomeIcon icon={faSpinner} pulse size="lg" className="ml-3" /> }
              </Col>
            </Form.Group>
          </Form> :
          <p>You must be logged in to suggest an idea. Sign up or login at the top right!</p>
        }
      </section>
    );
  }
}

export default NewIdeaForm;
