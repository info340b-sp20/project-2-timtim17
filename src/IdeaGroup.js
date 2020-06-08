import React, {Component} from 'react';
import IdeaCard from './IdeaCard';

class IdeaGroup extends Component {
  render() {
    const ideaCards = this.props.ideas.map((idea, idx) => <IdeaCard key={idea.id} idea={idea} user={this.props.user}
      handleRemove={this.props.handleRemove} adminUID={this.props.adminUID} gid={this.props.groupId}
      className={parseInt(this.props.highlightIdx) === idx && 'highlight-card'} />);
    return (
      <>
        <h2>{this.props.title}</h2>
        { this.props.ideas.length === 0 ? <p>No ideas found... maybe try suggesting one?</p>
                                        : <section className="idea-card-group">{ideaCards}</section> }
      </>
    );
  }
}

export default IdeaGroup;
