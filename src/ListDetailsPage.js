import React, {Component} from 'react';
import firebase from 'firebase/app';
import NewIdeaForm from './NewIdeaForm';
import IdeaGroup from './IdeaGroup';
import {moviesDBKey} from './Config';
import {checkStatus} from './util';
import _ from 'lodash';

const MOVIESDB_API = `https://api.themoviedb.org/3/search/multi?api_key=${moviesDBKey}&query={query}&page=1&include_adult=false`;
const MOVIESDB_IMG_PATH_PREFIX = 'https://image.tmdb.org/t/p/w780/';

class ListDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      requiredVotes: 1
    };
  }

  componentDidMount() {

  }

  addNewIdea = ideaTitle => {
    const url = MOVIESDB_API.replace('{query}', encodeURI(ideaTitle));
    return fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        let image = null;
        if (response.results.length > 0 && response.results[0].backdrop_path) {
          image = MOVIESDB_IMG_PATH_PREFIX + response.results[0].backdrop_path;
        }
        this.setState({
          ideas: [...this.state.ideas, {
            title: _.startCase(ideaTitle),
            votes: 1,
            image: image,
            createdBy: this.props.user.uid
          }]
        })
      });
  }

  handleRemove = id => {
    this.setState({
      ideas: this.state.ideas.filter((val, idx) => idx !== id)
    });
  }

  render() {
    const upvotedIdeas = this.state.ideas.filter(idea => idea.votes >= this.state.requiredVotes);
    const otherIdeas = this.state.ideas.filter(idea => !upvotedIdeas.includes(idea));
    return (
      <>
        <NewIdeaForm user={this.props.user} handleAdd={this.addNewIdea} handleError={this.props.handleError} />
        <IdeaGroup user={this.props.user} title="Upvoted Ideas" ideas={upvotedIdeas} handleRemove={this.handleRemove} />
        <IdeaGroup user={this.props.user} title="Other Ideas" ideas={otherIdeas} handleRemove={this.handleRemove} />
      </>
    );
  }
}

export default ListDetailsPage;
