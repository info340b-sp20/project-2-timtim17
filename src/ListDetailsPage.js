import React, {Component} from 'react';
import firebase from 'firebase/app';
import NewIdeaForm from './NewIdeaForm';
import IdeaGroup from './IdeaGroup';
import ListDetailsHeader from './ListDetailsHeader';
import ListSettingsModal from './ListSettingsModal';
import PickedModal from './PickedModal';
import {moviesDBKey} from './Config';
import {checkStatus} from './util';
import _ from 'lodash';
import 'whatwg-fetch'

const MOVIESDB_API = `https://api.themoviedb.org/3/search/multi?api_key=${moviesDBKey}&query={query}&page=1&include_adult=false`;
const MOVIESDB_IMG_PATH_PREFIX = 'https://image.tmdb.org/t/p/w780/';

class ListDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      name: 'Loading... please wait',
      dbgid: null,
      showListSettingsModal: false,
      highlightCard: null,
      isPicking: false,
      showPicked: false,
      showPickedModal: false,
      pickedIdx: null,
      exists: false
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
            dbgid: this.dbRef.id,
            exists: true
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
        this.setState({exists: false});
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
    if (this.props.user && this.state.exists) {
      const userDBRef = this.db.collection('users').doc(this.props.user.uid);
      userDBRef.get().then(doc => {
        if (doc.exists && doc.data().groups) {
          const curGroups = doc.data().groups;
          if (!curGroups) {
            userDBRef.set({groups:[this.dbRef]});
          } else if(!_.find(curGroups, group => group.id === this.dbRef.id)) {
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
          title: ideaTitle,
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

  showListSettingsModal = () => {
    this.setState({
      showListSettingsModal: true
    });
  }

  hideListSettingsModal = () => {
    this.setState({
      showListSettingsModal: false
    });
  }

  pickRandom = () => {
    let numLoops = 1 + Math.floor(Math.random() * 5);
    let numStops = Math.floor(Math.random() * this.upvotedIdeas.length) + numLoops * this.upvotedIdeas.length;
    const randWheelTick = idx => setTimeout(curIdx => {
      this.setState({
        highlightCard: curIdx % this.upvotedIdeas.length
      });
      if (curIdx === numStops) {
        this.setState({
          isPicking: false,
          showPicked: true,
          showPickedModal: true,
          pickedIdx: numStops % this.upvotedIdeas.length
        });
      } else {
        randWheelTick(idx + 1);
      }
    }, 100, idx);
    this.setState({ isPicking: true });
    randWheelTick(0);
  }

  hidePickedModal = () => {
    this.setState({
      showPickedModal: false,
      highlightCard: null
    });
  }

  render() {
    this.upvotedIdeas = this.state.ideas.filter(idea => idea.upvotedBy.length >= this.state.requiredVotes);
    this.otherIdeas = this.state.ideas.filter(idea => !this.upvotedIdeas.includes(idea));
    return (
      <>
        <ListDetailsHeader name={this.state.name} isListAdmin={this.props.user && this.props.user.uid === this.state.adminUid}
          showSettingsModal={this.showListSettingsModal} canPickRandom={this.upvotedIdeas.length > 0 && !this.state.isPicking} handlePickRandom={this.pickRandom} />
        <NewIdeaForm user={this.props.user} handleAdd={this.addNewIdea} handleError={this.props.handleError} clearAlert={this.props.clearAlert} />
        <IdeaGroup user={this.props.user} title="Upvoted Ideas" ideas={this.upvotedIdeas} handleRemove={this.handleRemove}
          adminUID={this.state.adminUid} groupId={this.state.dbgid}
          highlightIdx={this.state.highlightCard === null ? undefined : this.state.highlightCard} />
        <IdeaGroup user={this.props.user} title="Other Ideas" ideas={this.otherIdeas} handleRemove={this.handleRemove}
          adminUID={this.state.adminUid} groupId={this.state.dbgid} />
        <ListSettingsModal show={this.state.showListSettingsModal} handleClose={this.hideListSettingsModal}
          listName={this.state.name} requiredVotes={this.state.requiredVotes} groupId={this.state.dbgid} />
        <PickedModal show={this.state.showPickedModal} pick={this.upvotedIdeas[this.state.pickedIdx]} handleHide={this.hidePickedModal} />
      </>
    );
  }
}

export default ListDetailsPage;
