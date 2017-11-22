import React, { Component } from 'react';
import { List, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import {Route, Switch} from 'react-router-dom';
import $ from 'jquery';
import {EventEmitter} from 'fbemitter';

import Loading from '../shared/loading';
import getStunServerList from '../../lib/getstunserverlist';
import Chat from './chat';
import Toast from '../notification/toast';

import {getAllRoom} from '../../lib/room/rooms';
import * as constant from '../constants';
import * as Messages from '../../lib/messages/messages';
import * as Users from '../../lib/user/getuserinfo';
import * as Peer from 'peerjs';
import * as translate from 'counterpart';
import * as firebase from 'firebase';

import '../../assets/styles/common/main.css';
import '../../assets/styles/common/userIndex.css';

var emitter = new EventEmitter();

const KEYS_TO_FILTERS = ['displayName'];

const options = [
  {icon: 'status status-icon online-status'},
  {icon: 'status status-icon offline-status'},
  {icon: 'status status-icon away-status'}
];

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      users: [],
      unread: [],
      searchTerm: '',
      isloading: true
    };
    this.peer=null;
    this.emitter = new EventEmitter();    
  }

  componentWillMount(){
    var component = this;
    var properties = {}
    properties['component'] = this;
    properties['keyword'] = this.props.match.params.user_name;
    firebase.auth().onAuthStateChanged(function(user){
      if(!user){
        component.setState({isLoading : true})        
        component.emitter.emit('AddNewErrorToast',
        translate('app.system_notice.unauthenticated.title'),
        translate('app.system_notice.unauthenticated.text'),
        5000, () => {
          window.location = constant.HOME_URI+constant.SIGN_IN_URI;
        })
        setTimeout(() => {
          window.location = constant.HOME_URI+constant.SIGN_IN_URI;
        },5000); 
      }
      component.setState({currentUser: user})
      properties['currentUser'] = user;
      getAllRoom(properties, (userArr) => {
        component.setState({users : userArr});
      })
      
      // firebase.database().ref(`users/${user.uid}`).update({
      //   status: 'online'
      // })
      // Users.getTargetChat(properties);            
      Messages.notifyUnreadMessage(properties);
      getStunServerList(() => {
        var stunServer = JSON.parse(localStorage.stun_server_list);      
        do{
          component.peer = new Peer(user.uid,{key: constant.PEERJS_KEY,host: 'vnlaw-peerjs.herokuapp.com',secure: true,port:443, config: stunServer});           
          if(component.peer.id){
            component.setState({isloading :false});
          }
        }while(!!!(component.peer.id)) 
      });      
    })
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
    firebase.database().ref(`users/${this.state.currentUser.uid}`)
      .update({'status' : data.text});
  }

  renderStatus(userStatus, uid) {
    var component = this;
    if (uid === component.state.currentUser.uid) {
      return(
        <Dropdown id={component.state.currentUser.uid}
          icon={this.elementBaseStatus(userStatus)}>
          <Dropdown.Menu className='dropdown-status'>
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
      window.location = constant.BASE_URL + constant.HOME_URI;
    }).catch(function(error) {});
  }

  renderUnreadMessages(targetUid){
    var component = this;
    var unreadItem = component.state.unread.filter(
      item => item.lastMessage.senderUid === targetUid);
    
    if(unreadItem[0] && unreadItem[0].count !== 0){
      return(
        <div className='unread-mess'>
          {unreadItem[0].count}
        </div>
      )
    }
  }
  
  renderView() {
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
            <a href="/home">{translate('app.identifier.app_name')} </a>
          </div>
          <List>
            <div className='search-box'>
              <SearchInput className='search-input'
                onChange={this.searchUpdated.bind(this)}
                placeholder={translate('app.user.search') + '...'} />
            </div>
            {
              filteredUsers.map(user => {
                return(
                  <div className={
                    this.props.match.params.user_name === user.username
                      ? 'user active-link ': 'user'}
                    key={user.uid}>
                    {this.renderStatus(user.status, user.uid)}
                    <Link to={'/chat/' + user.username} key={user.uid}
                      activeClassName='active-link'>
                        <List.Item key={user.uid}>
                          <Image avatar src={user.photoURL}/>
                          <List.Content>
                            <List.Header>{user.uid !== this.state.currentUser.uid ? user.displayName : translate('app.chat.my_chat')}</List.Header>
                          </List.Content>
                          {this.renderUnreadMessages(user.uid)}
                        </List.Item>
                    </Link>
                  </div>
                );
              })
            }
          </List>
        </div>
        {
          this.state.users.map(user => {
            return(
              <Switch>
                <Route path={'/chat/' + user.username}
                  render={
                    (props) => (
                      <Chat {...props}
                        targetUser={user}
                        peer={this.peer}
                        currentUser={this.state.currentUser}
                        emitter={this.emitter}/>
                    )
                  }/>
              </Switch>
            )}
          )
        }
      </div>
    )
  }

  render(){
    return(
      <div>
        <Toast emitter={this.emitter} />
        {this.isloading ? <Loading /> : <div>{this.renderView()}</div>}
      </div>
    )
  }
}

export default ChatView;
