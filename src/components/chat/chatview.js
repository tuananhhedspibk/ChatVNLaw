import React, { Component } from 'react';
import { List, Image, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router';

import Chat from '../user/chat';

import * as constant from '../constants';
import avaLawyer from '../../assets/images/default-ava-lawyer.png';

import '../../assets/styles/user_index.css';

var authen = require('../../lib/api/authentication.js');

let user = require('../../lib/api/users.js');
let translate = require('counterpart');

const activeStyle = {
  backgroundColor: 'rgba(0, 0, 0, .05)'
};

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      current_user_name: '',
      current_user_id: ''
    }
  }

  componentDidMount() {
    var fields = constant.DEFAULT_FIELDS;
    var query = constant.DEFAULT_QUERY;

    fields["username"] = 1;

    query["roles"].push("user");
    query["roles"].push("bot");    

    var component = this;

    this.setState({current_user_name: this.props.params.user_name})

    user.list(fields,query,function(response){
      component.setState({users: response.data.users});
    });
  }

  logout() {
    authen.logout(function(response){
      if(response.status === 200) {
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    });
  }

  changeUserChat(username) {
    if (this.state.current_user_name !== username) {
      this.setState({current_user_name: username});
    }
  }

  render() {
    return (
      <div className='chat-ui'>
        <div className='list-users'>
          <div className='header-index'>
            <Dropdown icon='setting'>
              <Dropdown.Menu>
                <Dropdown.Item text={translate('app.identifier.logout')}
                  onClick={this.logout.bind(this)}/>
              </Dropdown.Menu>
            </Dropdown>
            {translate('app.identifier.app_name')}
            {this.state.current_user_name}
          </div>
          <List>
            <div className='search-box'>
              <Input icon='search'
                placeholder={translate("app.user.search") +  '...'}/>
            </div>
            {
              this.state.users.map(user => (
                <Link to={"/chat/" + user.username} key={user._id}
                  onClick={this.changeUserChat.bind(this, user.username)}
                  activeStyle={activeStyle}>
                  <List.Item key={user._id}>
                    <Image avatar src={avaLawyer}/>
                    {
                      (user.username === JSON.parse(localStorage.rocket_chat_user).user_name) ?
                        (
                          <List.Content>
                            <List.Header>{translate('app.chat.my_chat')}</List.Header>
                          </List.Content>
                        ):
                        (
                          <List.Content>
                            <List.Header>{user.username}</List.Header>
                            <List.Description>Online</List.Description>
                          </List.Content>
                        )
                      }
                    <List.Content floated='right'>
                      <div className='status'></div>
                    </List.Content>
                  </List.Item>
                </Link>
              ))
            }
          </List>
        </div>
        <Chat username={this.state.current_user_name}/>
      </div>
    )
  }
}

export default ChatView;
