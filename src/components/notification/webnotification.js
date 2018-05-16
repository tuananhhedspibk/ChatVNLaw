import React from 'react';
import Notification from 'react-web-notification';

import { APP_NAME } from '../constants';

class WebNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: '',
    };
  }

  componentWillMount(){
    var component = this;
    if (!!this.props.emitter) {
      this.props.emitter.addListener('AddNewErrorToast', function (title, text, duration, callback) {
        component.handleButtonClick(title, text, duration);
      })
      this.props.emitter.addListener('AddNewInfoToast', function (title, text, duration, callback) {
        component.handleButtonClick(title, text, duration);
      })
      this.props.emitter.addListener('AddNewWarningToast', function (title, text, duration, callback) {
        component.handleButtonClick(title, text, duration);
      })
      this.props.emitter.addListener('AddNewErrorToast', function (title, text, duration, callback) {
        component.handleButtonClick(title, text, duration);
      })
    }
  }
	
  handlePermissionGranted() {
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }

  handlePermissionDenied() {
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }

  handleNotSupported() {
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag) {
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag) {
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag) {
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag) {
    console.log(e, 'Notification shown tag:' + tag);
  }

  handleButtonClick(title, text, duration) {				
    if (localStorage.getItem('isFocused') === 'true'){
      return;
    }

    if (this.state.ignore) {
      return;
    }
      
    const tag = 'abc';
    const icon = 'https://raw.githubusercontent.com/tranlinh265/ChatVNLaw-1/tmp/public/app-icon.png';
  
    const options = {
      tag: tag,
      body: text,
      icon: icon,
      lang: 'en',
      dir: 'ltr'
    }
    this.setState({
      title: title || APP_NAME,
      options: options
    });
  }

  render() {
    return (
      <div>
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}/>
      </div>
    )
  }
}

export default WebNotification;
