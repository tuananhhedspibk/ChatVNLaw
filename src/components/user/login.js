import React, {Component} from 'react';
import AlertContainer from 'react-alert';
import { Input, Form, Button } from 'semantic-ui-react';

import * as constant from '../constants';
import NavBar from '../static/navbar';
import Brand from '../static/brand';

import '../../assets/styles/authen.css';
import '../../assets/styles/main.css';

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
      icon: <img alt='warning' src='../../assets/images/warning.png' />
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
    authen.login(this.state.username, this.state.password, function(response){
      if(response.status === 200){
        window.location = constant.BASE_URL;
      }
    });
  }

  render() {
    return(
      <div>
        <NavBar/>
        <Brand/>
        <div className='authen-box'>
          <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
          <div className='title'>
            {translate('app.identifier.login')}
          </div>
          <Form className='authen-form' onSubmit={this.handleSubmit.bind(this)} method='post'>
            <Form.Field>
              <label>{translate('app.login.username')}</label>
              <Input value={this.state.username}
                name='username'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.login.username')} />
            </Form.Field>
            <Form.Field>
              <label>{translate('app.login.password')}</label>
              <Input type='password'
                value={this.state.password}
                name='password'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.login.password')} />
            </Form.Field>
            <Button primary type='submit'>
              {translate('app.login.submit')}
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default UserLogin;
