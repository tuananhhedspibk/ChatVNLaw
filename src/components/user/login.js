import React, {Component} from 'react';
import axios from 'axios';
import * as constant from '../constants';
import AlertContainer from 'react-alert';

let translate = require('counterpart');

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
    var formData = new URLSearchParams();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    axios.post(constant.API_BASE_URL + constant.API_SIGN_IN, formData)
    .then(response => {
      let rocket_chat_user = {
        auth_token: response.data.data.authToken,
        user_id: response.data.data.userId
      };

      localStorage.setItem('rocket_chat_user', JSON.stringify(rocket_chat_user));
      window.location = constant.BASE_URL;
    })
    .catch(error => {
      alert(error);
    });
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
