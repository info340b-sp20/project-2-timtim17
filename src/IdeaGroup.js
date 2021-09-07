import React, {Component} from 'react';
import IdeaCard from './IdeaCard';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

class IdeaGroup extends Component {
  render() {
    // const ideaCards = this.props.ideas.map((idea, idx) => <CSSTransition key={idea.id} timeout={500} classNames="idea-card">
    //   <IdeaCard idea={idea} user={this.props.user} handleRemove={this.props.handleRemove}
    //   adminUID={this.props.adminUID} gid={this.props.groupId}
    //   className={parseInt(this.props.highlightIdx) === idx && 'highlight-card'} /></CSSTransition>);
    const ideaCards = this.props.ideas.map((idea, idx) => <IdeaCard key={idea.id} idea={idea}
      user={this.props.user} handleRemove={this.props.handleRemove} adminUID={this.props.adminUID}
      gid={this.props.groupId} className={parseInt(this.props.highlightIdx) === idx && 'highlight-card'} />);
    return (
      <>
        <h2>{this.props.title}</h2>
        { this.props.ideas.length === 0 ? <p>No ideas found... maybe try suggesting one?</p>
                                        : <div className="idea-card-group">{ ideaCards }</div> }
                                        {/* : <TransitionGroup className="idea-card-group">{ideaCards}</TransitionGroup> } */}
      </>
    );
  }
}

export default IdeaGroup;
