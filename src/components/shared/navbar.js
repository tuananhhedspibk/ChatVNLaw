import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/styles/common/main.css';

let translate = require('counterpart');

class Navbar extends Component {
  render() {
    return(
      <nav className='navbar navbar-expand-lg navbar-light'>
        <Link to='/login'>{translate('app.identifier.home')}</Link>
      </nav>
    )
  }
}

export default Navbar;
