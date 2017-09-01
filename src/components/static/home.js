import React, {Component} from 'react';

import NavBar from './navbar';
import GraphQL from './graphql'

class Home extends Component {
  render() {
    return(
      <div>
        <NavBar/>
        <GraphQL/>
      </div>
    )
  }
}

export default Home;
