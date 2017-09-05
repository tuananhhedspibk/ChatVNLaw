import React, {Component} from 'react';
import * as constant from '../constants';
import AlertContainer from 'react-alert';

let translate = require('counterpart');
var authen = require('../../lib/api/authentication.js');

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillMount() {
    if(localStorage.rocket_chat_user != null) {
      window.location = constant.BASE_URL;
    }
  }

  showAlert = (text) => {
    this.msg.show(text, {
      time: 2000,
      type: 'success',
      icon: <img alt='warning' src='images/warning.png' />
    })
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    authen.login(this.state.username, this.state.password, function(response){});
  }

  render() {
    return(
      <div className='login-box'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className='title'>
          {translate('app.login.login')}
        </div>
        <form onSubmit={this.handleSubmit.bind(this)} method='post'>
          <input type='text' className='form-control'
            value={this.state.username}
            name='username'
            onChange={this.handleInputChange.bind(this)}
            placeholder={translate('app.login.username')} />
          <input type='password' className='form-control'
            value={this.state.password}
            name='password'
            onChange={this.handleInputChange.bind(this)}
            placeholder={translate('app.login.password')} />
          <button className='btn btn-primary' type='submit'>
            {translate('app.login.submit')}
          </button>
        </form>
      </div>      
    )
  }
}

export default UserLogin;
