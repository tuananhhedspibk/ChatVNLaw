import React, {Component} from 'react';

let translate = require('counterpart');

class BasicInfoSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='basic-info-settings'
        id='tab-basic'>
          <div className='info-block'>
            <div className='avatar'>
              <div className='title'>
                {translate('app.settings.avatar')}
              </div>
              <img src={this.props.user.photoURL}/>
            </div>
          </div>
          <div className='info-block'>
            <div className='name'>
              <div className='title'>
                {translate('app.settings.name')}
              </div>
              <div className='ui left icon input'>
                <input placeholder={translate('app.settings.user_name')}
                  type='text' value={this.props.profile.username}/>
                <i className='users icon'></i>
              </div>
            </div>
          </div>
          <div className='info-block'>
            <div className='avatar'>
              <div className='title'>
                {translate('app.settings.avatar')}
              </div>
              
            </div>
          </div>
          <div className='info-block'>
            <div className='avatar'>
              <div className='title'>
                {translate('app.settings.avatar')}
              </div>
              
            </div>
          </div>
          <div className='info-block'>
            <div className='avatar'>
              <div className='title'>
                {translate('app.settings.avatar')}
              </div>
              
            </div>
          </div>
      </div>
    )
  }
}

export default BasicInfoSettings;
