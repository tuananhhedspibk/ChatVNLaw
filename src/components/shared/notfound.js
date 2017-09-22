import React, {Component} from 'react';

import '../../assets/styles/common/404.css';

import image404 from '../../assets/images/404.png' 

class NotFoundPage extends Component {
  render() {
    return(
      <div className='wrapper row2'>
        <div id='container' className='clear'>
          <section id='fof' className='clear'>
            <h1>WHOOPS!</h1>
            <img src={image404} alt=''/>
            <p>The Page You Requested Could Not Be Found On Our Server</p>
            <p>Go back to the <a href='javascript:history.go(-1)'>previous page</a>
              or visit our <a href='/'>homepage</a></p>
          </section>
        </div>
      </div>
    )
  }
}

export default NotFoundPage;
