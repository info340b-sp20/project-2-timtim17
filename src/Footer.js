import React, {Component} from 'react';
import { SourceCodeLink } from './MetaLinks';

class Footer extends Component {
  render() {
    return (
      <footer>
	<div>
          <p>&copy; 2020</p>
	  <SourceCodeLink />
        </div>
        <div>
          <p>Some data and images sourced from <a href="https://themoviedb.org">The Movie Database</a></p>
          <img alt="The Movie Database logo" src="/img/tmdb_logo.svg" />
        </div>
      </footer>
    );
  }
}

export default Footer;
