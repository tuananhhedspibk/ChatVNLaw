import React, { Component } from 'react';
import { List, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router';
import SearchInput, {createFilter} from 'react-search-input';

import Chat from '../user/chat';

import * as constant from '../constants';

import '../../assets/styles/common/main.css';
import '../../assets/styles/common/user_index.css';

var authen = require('../../lib/api/authentication.js');

let user = require('../../lib/api/users.js');
let translate = require('counterpart');

const activeStyle = {
  backgroundColor: 'rgba(0, 0, 0, .05)'
};

const KEYS_TO_FILTERS = ['username']

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      current_chat_user_name: '',
      current_chat_user_id: '',
      current_chat_user_type: '',
      searchTerm: '',
      current_user_name: '',
      user_names_list: ''
    }
  }

  componentDidMount() {
    if(localStorage.rocket_chat_user == null) {
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    }
    var fields = constant.DEFAULT_FIELDS;
    var query = constant.DEFAULT_QUERY;

    fields['username'] = 1;
    fields['status'] = 1;
    fields['type'] = 1;

    query['roles'].push('user');
    query['roles'].push('bot');

    var component = this;

    user.list(fields,query,function(response){
      component.setState({users: response.data.users});
      var current_user = null;
      component.setState({current_user_name:
        JSON.parse(localStorage.rocket_chat_user).user_name});
      component.state.users.map(user => {
        if (user.username === JSON.parse(localStorage.rocket_chat_user).user_name) {
          current_user = user;  
        }
      });
      if (current_user !== null) {
        var users_list = component.state.users;
        users_list.sort(function(x, y){
          return x === current_user ? -1 : y === current_user ? 1 : 0;
        });
        component.setState({users: users_list});
        component.state.users.map(user => {
          if (user.username === component.props.params.user_name) {
            component.setState({current_chat_user_type: user.type});
            component.setState({current_chat_user_name: component.props.params.user_name});
          }
        })
      }
    });
  }

  changeUserChat(username, usertype) {
    if (this.state.current_chat_user_name !== username) {
      this.setState({current_chat_user_name: username});
      this.setState({current_chat_user_type: usertype});
    }
  }

  renderStatus(userStatus) {
    if (userStatus === 'online') {
      return(
        <div className='status online-status'>
        </div>
      )
    }
    else if (userStatus === 'offline') {
      return(
        <div className='status offline-status'>
        </div>
      )
    }
    else if (userStatus === 'away') {
      return(
        <div className='status away-status'>
        </div>
      )
    }
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  logout() {
    authen.logout(function(response){
      if(response.status === 200) {
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    });
  }

  render() {
    const filteredUsers = this.state.users.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
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
          </div>
          <List>
            <div className='search-box'>
              <SearchInput className='search-input'
                onChange={this.searchUpdated.bind(this)}
                placeholder={translate('app.user.search') + '...'} />
            </div>
            {
              filteredUsers.map(user => {
                console.log(user.type);
                if(user.username !== this.state.current_user_name) {
                  if(user.type !== 'bot') {
                    return(
                      <Link to={'/chat/' + user.username} key={user._id}
                        onClick={this.changeUserChat.bind(this, user.username, user.type)}
                        activeStyle={activeStyle}>
                          <List.Item key={user._id}>
                            {this.renderStatus(user.status)}
                            <Image avatar src={constant.avaLawyer}/>
                            <List.Content>
                              <List.Header>{user.username}</List.Header>
                            </List.Content>
                            <div className='unread-mess'>
                              123
                            </div>
                          </List.Item>
                      </Link>
                    );
                  }
                  else {
                    return(
                      <Link to={'/chat/' + user.username} key={user._id}
                        onClick={this.changeUserChat.bind(this, user.username, user.type)}
                        activeStyle={activeStyle}>
                          <List.Item key={user._id}>
                            {this.renderStatus(user.status)}
                            <Image avatar src={constant.avaBot}/>
                            <List.Content>
                              <List.Header>{user.username}</List.Header>
                            </List.Content>
                            <div className='unread-mess'>
                              123
                            </div>
                          </List.Item>
                      </Link>
                    );
                  }
                }
                else {
                  return(
                    <Link to={'/chat/' + user.username} key={user._id}
                      onClick={this.changeUserChat.bind(this, user.username, user.type)}
                      activeStyle={activeStyle}>
                        <List.Item key={user._id}>
                          {this.renderStatus(user.status)}
                          <Image avatar src={constant.avaLawyer}/>
                          <List.Content>
                            <List.Header>
                              {translate('app.chat.my_chat')}
                            </List.Header>
                          </List.Content>
                        </List.Item>
                    </Link>
                  );
                }
              })
            }
          </List>
        </div>
        <Chat currentChatUserName={this.state.current_chat_user_name}
          currentChatUserType={this.state.current_chat_user_type}/>
      </div>
    )
  }
}

export default ChatView;
