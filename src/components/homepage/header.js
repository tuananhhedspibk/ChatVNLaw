import React, { Component } from 'react';

import Nav from './nav';
import Find from './find';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <div className='content'>
          <Nav navStyle='light' />
          <Nav id='-extra-nav'
            navStyle='inverse nav-hidden fixed-top'/>
          <Find/>
        </div>
      </div>
    )
  }
}

export default Header;
