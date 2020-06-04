import React, {Component} from 'react';
import firebase from 'firebase/app';
import NewIdeaForm from './NewIdeaForm';
import IdeaGroup from './IdeaGroup';
import ListDetailsHeader from './ListDetailsHeader';
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
      name: 'Loading... please wait',
      dbgid: null
    };
  }

  componentDidMount() {
    this.db = firebase.firestore();
    this.dbRef = this.db.collection('groups').doc(this.props.match.params.groupid);
    this.handleDBError = error => this.props.handleError(new Error('Error connecting to database: ' + error));
    this.dbRef.get().then(doc => {
      if (doc.exists) {
        // subscribe to group updates
        const unsubscribeGroup = this.dbRef.onSnapshot(doc => {
          const data = doc.data();
          this.setState({
            requiredVotes: data.votes_required,
            name: data.name,
            adminUid: data.admin_uid,
            dbgid: this.dbRef.id
          });
        }, this.handleDBError);
        // subscribe to idea updates
        const unsubscribeDoc = this.dbRef.collection('ideas').onSnapshot(query => {
          this.setState({
            ideas: query.docs.map(doc => ({...doc.data(), id: doc.id}))
          });
        }, this.handleDBError);
        this.addUserToGroup();
        this.unsubscribeDB = () => {
          unsubscribeGroup();
          unsubscribeDoc();
        }
      } else {
        this.props.handleError(new Error('Error connecting to database: Is this group id a valid group id?'));
      }
    }).catch(this.handleDBError);
  }

  componentDidUpdate(prevProps) {
    // updated user
    if (this.props.user && (!prevProps.user || this.props.user.uid !== prevProps.user.uid)) {
      this.addUserToGroup();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeDB) {
      this.unsubscribeDB();
    }
    this.props.clearAlert();
  }

  addUserToGroup() {
    // add this group to this user
    if (this.props.user) {
      const userDBRef = this.db.collection('users').doc(this.props.user.uid);
      userDBRef.get().then(doc => {
        if (doc.exists && doc.data().groups) {
          const curGroups = doc.data().groups;
          if (!curGroups || !_.find(curGroups, group => group.id === this.dbRef.id)) {
            userDBRef.set({groups:[...curGroups, this.dbRef]});
          }
        } else {
          userDBRef.set({groups:[this.dbRef]});
        }
      }).catch(this.handleDBError);
    }
  }

  addNewIdea = ideaTitle => {
    const url = MOVIESDB_API.replace('{query}', encodeURI(ideaTitle));
    return fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        const newDoc = {
          title: _.startCase(ideaTitle),
          upvotedBy: [this.props.user.uid],
          createdBy: this.props.user.uid
        };
        if (response.results.length > 0 && response.results[0].backdrop_path) {
          newDoc.image = MOVIESDB_IMG_PATH_PREFIX + response.results[0].backdrop_path;
        }
        this.dbRef.collection('ideas').doc().set(newDoc);
      });
  }

  handleRemove = id => {
    this.dbRef.collection('ideas').doc(id).delete()
      .catch(this.props.handleRemove);
  }

  render() {
    const upvotedIdeas = this.state.ideas.filter(idea => idea.upvotedBy.length >= this.state.requiredVotes);
    const otherIdeas = this.state.ideas.filter(idea => !upvotedIdeas.includes(idea));
    return (
      <>
        <ListDetailsHeader name={this.state.name} />
        <NewIdeaForm user={this.props.user} handleAdd={this.addNewIdea} handleError={this.props.handleError} clearAlert={this.props.clearAlert} />
        <IdeaGroup user={this.props.user} title="Upvoted Ideas" ideas={upvotedIdeas} handleRemove={this.handleRemove} adminUID={this.state.adminUid} groupId={this.state.dbgid} />
        <IdeaGroup user={this.props.user} title="Other Ideas" ideas={otherIdeas} handleRemove={this.handleRemove} adminUID={this.state.adminUid} groupId={this.state.dbgid} />
      </>
    );
  }
}

export default ListDetailsPage;
