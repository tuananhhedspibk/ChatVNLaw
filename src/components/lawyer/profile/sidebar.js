import React, {Component} from 'react';

let translate = require('counterpart');

class SideBar extends Component {
  render() {
    return(
      <nav className='nav-sidebar'>
        <ul className='nav nav-pills nav-stacked'
          role='tablist'>
          <li role='presentation'>
            <a href='#tab-basic' className='link-basic active'
              aria-controls='tab-basic'
              data-toggle='tab' role='tab'>
              {translate('app.settings.basic_infor')}
            </a>
          </li>
          <li role='presentation'>
            <a className='link-detail' role='tab'
              aria-controls='tab-detail'
              href='#tab-detail' data-toggle='tab'>
              {translate('app.settings.detail_infor')}
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SideBar;
