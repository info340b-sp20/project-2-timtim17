import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ListPage extends Component {
  render() {
    return (
      <>
        <h1>Home!</h1>
        <Link to="/group/thisShouldChange">Test link to a group</Link>
      </>
    );
  }
}

export default ListPage;
