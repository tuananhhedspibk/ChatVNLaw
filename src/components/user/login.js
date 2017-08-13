import React, {Component} from 'react';
import axios from 'axios';
import * as constant from '../constants';
import AlertContainer from 'react-alert';
import * as sha256 from 'sha256';

let translate = require('counterpart');
var FormData = require('form-data');

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
      window.location = 'localhost:3000' + constant.HOME_URI;
    }
  }

  showAlert = () => {
    this.msg.show('Some text or component', {
      time: 2000,
      type: 'success',
      icon: <img alt='123' src='../../images/success.ico' />
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
    let formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    axios.post(constant.API_BASE_URL + constant.API_SIGN_IN, formData)
    .then(response => {
      console.log(response);
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
