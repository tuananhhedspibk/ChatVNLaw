import React, { Component } from 'react';
import HotLawyers from './hotlawyers';
import GetStarted from './getstarted';
import SearchLaw from './searchlaw';

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
