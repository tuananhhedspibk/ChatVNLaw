import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';

import * as constant from '../constants';
import ChatWindow from '../chat/chatwindow';
import UsersIndex from '../user/index';

import '../../assets/styles/chatui.css';

let translate = require('counterpart');
let user      = require('../../lib/api/users');
let chat = require('../../lib/api/chat');
class Home extends Component {
  renderView() {
    if (localStorage.rocket_chat_user == null) {
      window.location = constant.BASE_URL + constant.SIGN_IN_URI; 
    }
    else{
      return(
        <div className='chat-ui'>
          <UsersIndex/>
          <ChatWindow/>
        </div>
      )
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    
    // var query = constant.DEFAULT_QUERY;
		// query["roles"].push("user");
    // query["roles"].push("bot");
    
    // user.list(fields,query,function(response){
    //   console.log(response);
    // });

    // chat.postMessage("P2qGcutXKrFiCZWpa","","test api","","","",[],function(response){
    //   console.log(response);
    // });
    user.getAvatar("dwajdjwaj", function(response){
      console.log(response);
    })
    //end demo
  }
  handleSubmit1(evt) {
    evt.preventDefault();
    var imagefile = document.querySelector('#file');    
    user.setAvatarWithFile(imagefile.files[0],function(response){

    });
  }
  render() {
    return (
      <div>
        {this.renderView()}
        {/* begin demo */}
        <Form className='authen-form' onSubmit={this.handleSubmit.bind(this)} method='post'>
          <Button primary type='submit'>
            {translate('app.login.submit')}
          </Button>
          
          
        </Form>
        <Form className='set-avatar' onSubmit={this.handleSubmit1.bind(this)} method='post'>
          <Input type='file' id="file" name="file"/>
          <Button primary type='submit'>
            {translate('app.login.submit')}
          </Button>  
        </Form>
        {/* end demo */}
      </div>
    )
  }
}

export default Home;
