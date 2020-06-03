import React, {Component} from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import IdeaCard from './IdeaCard';

class IdeaGroup extends Component {
  render() {
    const ideaCards = this.props.ideas.map((idea, idx) => <IdeaCard key={idx} id={idx} idea={idea} user={this.props.user} handleRemove={this.props.handleRemove} />);
    return (
      <>
        <h2>{this.props.title}</h2>
        { this.props.ideas.length === 0 ? <p>No ideas found... maybe try suggesting one?</p>
                                        : <CardColumns>{ideaCards}</CardColumns> }
      </>
    );
  }
}

export default IdeaGroup;
