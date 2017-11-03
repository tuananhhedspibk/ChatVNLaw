import React, { Component } from 'react';

import HotLawyers from './hotLawyers';
import GetStarted from './getStarted';
import SearchLaw from './searchLaw';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='main-content'>
        <HotLawyers/>
        <GetStarted/>
        <SearchLaw/>
      </div>
    );
  }
}

export default Content;
