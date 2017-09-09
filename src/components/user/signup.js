import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import { Input, Form, Button } from 'semantic-ui-react';

import NavBar from '../static/navbar';
import * as constant from '../constants';

import '../../assets/styles/authen.css';

let translate = require('counterpart');
let user = require('../../lib/api/users.js');
let authen = require('../../lib/api/authentication.js');

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
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
    if (this.state.password === this.state.password_confirmation) {
      var username = this.state.username;
      var password = this.state.password;
      var component = this;
      user.register(this.state.username, this.state.email, 
        this.state.password, this.state.name, function(response) {
          if (response.status === 200) {
            authen.login(username, password, function(response) {
              if (response.status === 200) {
                user.setAvatarWithImageUrl(constant.DEFAULT_AVATAR_URL.valueOf(),function(response){
                  if(response.status === 200){
                    window.location = constant.BASE_URL;            
                  }
                });
              }
            });
          }
          else {
            component.showAlert('Singup unsuccessfully, check information');
          }
        });
    }
    else {
      this.showAlert('Password and Password confirmation not the same'); 
    } 
  }

  render() {
    return(
      <div className='wrapper'>
        <NavBar/>
        <div className='authen-box signup-box'>
          <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
          <div className='title'>
            {translate('app.identifier.signup')}
          </div>
          <Form className='authen-form' onSubmit={this.handleSubmit.bind(this)} method='post'>
            <Form.Field className='left'>
              <label>{translate('app.signup.name')}</label>
              <Input value={this.state.name}
                name='name'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.signup.name')} />
            </Form.Field>
            <Form.Field className='right'>
              <label>{translate('app.signup.password')}</label>
              <Input type='password'
                value={this.state.password}
                name='password'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.signup.password')} />
            </Form.Field>
            <Form.Field className='left'>
              <label>{translate('app.signup.username')}</label>
              <Input value={this.state.username}
                name='username'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.signup.username')} />
            </Form.Field>
            <Form.Field className='right'>
              <label>{translate('app.signup.password_confirmation')}</label>
              <Input type='password'
                value={this.state.password_confirmation}
                name='password_confirmation'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.signup.password_confirmation')} />
            </Form.Field>
            <Form.Field className='left'>
              <label>{translate('app.signup.email')}</label>
              <Input value={this.state.email}
                name='email'
                type='email'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.signup.email')} />
            </Form.Field>
            <Button primary type='submit'>
              {translate('app.signup.submit')}
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default UserSignUp;
