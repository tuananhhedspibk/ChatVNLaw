import React, {Component} from 'react';

import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import NotFoundContent from './notfoundcontent';

class NotFound extends Component {
  render() {
    return (
      <div className='notfound-wrapper'>
        <Nav navStyle='inverse'/>
        <NotFoundContent />
        <Footer/>
      </div>
    )
  }
}

export default NotFound;
