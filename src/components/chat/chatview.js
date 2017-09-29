import React, { Component } from 'react';
import { List, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import $ from 'jquery';

import Chat from '../user/chat';

import * as constant from '../constants';

import '../../assets/styles/common/main.css';
import '../../assets/styles/common/user_index.css';

let translate = require('counterpart');
var firebase = require('firebase');

const activeStyle = {
  backgroundColor: 'rgba(0, 0, 0, .05)'
};

const KEYS_TO_FILTERS = ['username'];

const options = [
  {icon: 'status status-icon online-status'},
  {icon: 'status status-icon offline-status'},
  {icon: 'status status-icon away-status'}
];

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
      current_user_id: '',
      user_names_list: ''
    }
  }

  componentWillMount(){
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
    var component = this;
    var user_name = this.props.match.params.user_name;
    this.setState({current_chat_user_name : user_name});
    firebase.database().ref('users').orderByChild('username')
      .equalTo(user_name).once('value')
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
            component.setState({current_user_name: item.username});
            component.setState({current_user_id: user.uid});
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

  elementBaseStatus(userStatus) {
    if (userStatus === 'online') {
      return(
        'status status-icon online-status icon'
      )
    }
    else if (userStatus === 'offline') {
      return(
        'status status-icon offline-status icon'
      )
    }
    else if (userStatus === 'away') {
      return(
        'status status-icon away-status icon'
      )
    }
  }

  changeStatus(event, data) {
    firebase.database().ref('users')
      .child(this.state.current_user_id).update({"status" : data.text});
  }

  renderStatus(userStatus, username) {
    if (username === this.state.current_user_name) {
      return(
        <Dropdown id={this.state.current_user_id}
          icon={this.elementBaseStatus(userStatus)}>
          <Dropdown.Menu>
            <Dropdown.Item text={translate('app.user.status.online')}
              icon={options[0].icon}
              onClick={this.changeStatus.bind(this)}/>
            <Dropdown.Item text={translate('app.user.status.offline')}
              icon={options[1].icon}
              onClick={this.changeStatus.bind(this)}/>
            <Dropdown.Item text={translate('app.user.status.away')}
              icon={options[2].icon}
              onClick={this.changeStatus.bind(this)}/>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return(
      <Dropdown
        icon={this.elementBaseStatus(userStatus)}/>
    );
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  logout() {
    firebase.auth().signOut().then(function() {
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    }).catch(function(error) {});
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
                      <div className='user' key={user._id}>
                        {this.renderStatus(user.status, user.username)}
                        <Link to={'/chat/' + user.username} key={user._id}
                          onClick={this.changeUserChat.bind(this, user.username, user.type, user._id)}>
                            <List.Item key={user._id}>
                              <Image avatar src={user.avatarUrl}/>
                              <List.Content>
                                <List.Header>{user.displayName}</List.Header>
                              </List.Content>
                              <div className='unread-mess'>
                                123
                              </div>
                            </List.Item>
                        </Link>
                      </div>
                    );
                  }
                  else {
                    return(
                      <div className='user' key={user._id}>
                        {this.renderStatus(user.status, user.username)}
                        <Link to={'/chat/' + user.username} key={user._id}
                          onClick={this.changeUserChat.bind(this, user.username, user.type, user._id)}>
                            <List.Item key={user._id}>
                              <Image avatar src={constant.avaBot}/>
                              <List.Content>
                                <List.Header>{user.username}</List.Header>
                              </List.Content>
                              <div className='unread-mess'>
                                123
                              </div>
                            </List.Item>
                        </Link>
                      </div>
                    );
                  }
                }
                else {
                  return(
                    <div className='user' key={user._id}>
                      {this.renderStatus(user.status, user.username)}
                      <Link to={'/chat/' + user.username} key={user._id}
                        onClick={this.changeUserChat.bind(this, user.username, user.type, user._id)}>
                          <List.Item key={user._id}>
                            <Image avatar src={constant.avaLawyer}/>
                            <List.Content>
                              <List.Header>
                                {translate('app.chat.my_chat')}
                              </List.Header>
                            </List.Content>
                          </List.Item>
                      </Link>
                    </div>
                  );
                }
              })
            }
          </List>
        </div>
        <Chat currentChatUserName={this.state.current_chat_user_name}
          currentChatUserId={this.state.current_chat_user_id}/>
      </div>
    )
  }
}

export default ChatView;
