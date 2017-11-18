import React, {Component} from 'react';

let translate = require('counterpart');

class SideBar extends Component {
  render() {
    return(
      <div className='col-sm-0 col-md-3'>
        <nav className='nav-sidebar'>
          <ul className='nav tabs'>
            <li className='active'>
              <a href='#tab-basic' data-toggle='tab'>
                {translate('app.settings.basic_infor')}
              </a>
            </li>
            <li>
              <a href='#tab-detail' data-toggle='tab'>
                {translate('app.settings.detail_infor')}
              </a>
            </li>                             
          </ul>
        </nav>
      </div>
    )
  }
}

export default SideBar;
