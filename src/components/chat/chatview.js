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

var firebase = require('firebase');

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

  componentWillMount(){
    var component = this;
    var current_user_name = this.props.location.pathname.split('/chat/');
    this.setState({current_chat_user_name : current_user_name[1]})
    firebase.database().ref('users').orderByChild('username').equalTo(current_user_name[1]).once('value')
    .then(function(snapshot){
      if(snapshot.exists()){
        snapshot.forEach(function(element){
          component.setState({current_chat_user_id: element.key});
        })
      }else{
        window.location = constant.BASE_URL + '/*';
      }
    })
  }
  
  componentDidMount() {
    var component = this;
    
    firebase.auth().onAuthStateChanged(function(user) {
      if(!user){
        window.location = constant.BASE_URL + constant.SIGN_IN_URI; 
      }
      let ref = firebase.database().ref('users').orderByChild('role').equalTo('user');
      ref.once('value')
      .catch(function(error){

      }).then(function(snapshot){
        var userArr = []
        ref.on('child_added', function(data) {
          
          var item = {
            username: data.val().username,
            displayName: data.val().username,
            _id : data.key,
            status: data.val().status,
            avatarUrl: data.val().avatarUrl
          }
          if(data.key === user.uid){
            item["displayName"] = "My.Chat";
            userArr.unshift(item);
            component.setState({users: userArr});                      
            return;
          }
          userArr.push(item);
          component.setState({users: userArr});          
        });
        ref.on('child_changed', function(data) {
          let tmp = data.val().username;
          if(data.key === user.uid){
            tmp = "My.Chat";
          }
          userArr.every(function(element,index){           
            if(element._id === data.key){
              userArr[index] = {
                username: data.val().username,
                displayName: tmp,
                _id : data.key,
                status: data.val().status,
                avatarUrl: data.val().avatarUrl
              };
              component.setState({users: userArr});              
              return false;
            }else{
              return true;
            }
          })
        });
        ref.on('child_removed', function(data) {
          if(data.key === user.uid){
            return;
          }
          userArr.every(function(element,index){           
            if(element._id === data.key){
              userArr.splice(index,1);
              component.setState({users: userArr});              
              return false;
            }else{
              return true;
            }
          })
        });

      });    
    }, function(error){
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    });
  }

  changeUserChat(username, usertype, userId) {
    if (this.state.current_chat_user_name !== username) {
      this.setState({current_chat_user_name: username});
      this.setState({current_chat_user_type: usertype});
      this.setState({current_chat_user_id: userId});
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
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    }).catch(function(error) {
      // An error happened.
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
                if(user.username !== this.state.current_user_name) {
                  if(user.type !== 'bot') {
                    return(
                      <Link to={'/chat/' + user.username} key={user._id}
                        onClick={this.changeUserChat.bind(this, user.username, user.type)}
                        activeStyle={activeStyle}>
                          <List.Item key={user._id}>
                            {this.renderStatus(user.status)}
                            <Image avatar src={user.avatarUrl}/>
                            <List.Content>
                              <List.Header>{user.displayName}</List.Header>
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
                        onClick={this.changeUserChat.bind(this, user.username, user.type, user._id)}
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
        {/* <Chat currentChatUserName={this.state.current_chat_user_name}
          currentChatUserId={this.state.current_chat_user_id}/> */}
      </div>
    )
  }
}

export default ChatView;
