import React, { Component } from 'react';
import $ from 'jquery';

import Nav from './nav';
import Find from './find';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='header'>
        <div className='content'>
          <Nav/>
          <Find/>
        </div>
      </div>
    )
  }
}

export default Header;
