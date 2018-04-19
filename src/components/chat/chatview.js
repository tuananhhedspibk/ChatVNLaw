import React, { Component } from 'react';
import { List, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import {Route, Switch} from 'react-router-dom';
import $ from 'jquery';
import {EventEmitter} from 'fbemitter';
import { Scrollbars } from 'react-custom-scrollbars';

import Loading from '../shared/loading';
import ChatContent from './chatcontent';
import Toast from '../notification/toast';

import { getStunServerList} from '../../lib/getstunserverlist';
import { checkAuthen } from '../../lib/notification/toast';
import { logoutRails } from '../../lib/user/authentication';
import { getAllRooms, updateRoom } from '../../lib/room/rooms';

import * as constant from '../constants';
import * as Messages from '../../lib/messages/messages';
import * as Users from '../../lib/user/getuserinfo';
import * as translate from 'counterpart';
import * as firebase from 'firebase';

import '../../assets/styles/common/main.css';
import '../../assets/styles/common/userIndex.css';

const KEYS_TO_FILTERS = ['profile.displayName'];

const options = [
  {icon_color: 'online'},
  {icon_color: 'offline'},
  {icon_color: 'away'}
];

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      users: [],
      unread: [],
      roomIds: [],
      roomStatus: [],
      searchTerm: '',
      isloading: true,
      usersListHeight: 0
    };
    this.emitter = new EventEmitter();    
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    component.setState({usersListHeight: vh - 125});
  }

  componentDidMount() {
    var component = this;
    this.setHeight(this);
    $(window).resize(function(){
      component.setHeight(component);
    });
  }

  checkAuthen() {
    if(localStorage.chat_vnlaw_user) {
      var user = {
        uid: JSON.parse(localStorage.chat_vnlaw_user)['id'],
        avatar: JSON.parse(localStorage.chat_vnlaw_user)['avatar']
      }
      return user;
    }
    else {
      localStorage.setItem('redirect_uri', constant.CHAT_URI);
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    }
  }

  componentWillMount(){
    var component = this;
    var properties = {}
    properties['component'] = this;
    properties['keyword'] = this.props.userNameURL;
    
    firebase.auth().onAuthStateChanged(function(user){
      if(!user){
        component.setState({isloading : true})   
        checkAuthen(component.emitter, constant.BASE_URL+constant.SIGN_IN_URI, ()=>{

        })      
      }
      else{
        var user = null;
        user = component.checkAuthen();
        if(user) {
          component.setState({currentUser: user});
          properties['currentUser'] = user;
          getAllRooms((success, response) => {
            if (success) {
              var users = [];
              var roomIds = [];
              var roomStatus = [];
              if(JSON.parse(localStorage.chat_vnlaw_user)['role'] == 'User') {
                response.data.rooms.map((room, idx) => {
                  users.push(room.lawyer);
                  roomIds.push(room.id);
                  roomStatus.push(room.status);
                });
              }
              else {
                response.data.rooms.map((room, idx) => {
                  users.push(room.user);
                  roomIds.push(room.id);
                  roomStatus.push(room.status);
                });
              }
              component.setState({
                users : users,
                roomIds: roomIds,
                roomStatus: roomStatus
              });
            }
            else {

            }
          })
          if(component.state.currentUser) {
            if(properties['keyword']) {
              Messages.notifyUnreadMessage(properties);
            }
            component.setState({isloading: false});
          }
        }
      }
    });
  }

  classBaseStatus(userStatus) {
    if (userStatus === 'online') {
      return(
        options[0].icon_color
      )
    }
    else if (userStatus === 'offline') {
      return(
        options[1].icon_color
      )
    }
    else if (userStatus === 'away') {
      return(
        options[2].icon_color
      )
    }
  }

  renderStatus(userStatus) {
    return(
      <Dropdown
        icon='circle'
        className={this.classBaseStatus(userStatus)}/>
    );
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  logout() {
    var component = this;

    firebase.auth().signOut().then(function() {
      logoutRails((success, data) => {
        if(success) {
          localStorage.removeItem(constant.STORAGE_ITEM);
          window.location = constant.BASE_URL + constant.HOME_URI;
        }
        else {
          component.emitter.emit('AddNewErrorToast', '',
          data.message, 5000, ()=>{})                         
          return;
        }
      })
    }).catch(function(error) {
      component.emitter.emit('AddNewErrorToast', '',
        error, 5000, ()=>{})                         
      return;
    });
  }

  getIdxOfRoomByRoomId(rid) {
    var r_idx = -1;
    this.state.roomIds.map((item, idx) => {
      if (item === rid) {
        r_idx = idx;
      }
    });
    return r_idx
  }

  changeRoomStatus(rid) {
    var r_idx = this.getIdxOfRoomByRoomId(rid);
    var room_status = this.state.roomStatus;
    room_status[r_idx] = 'Finish';
    this.setState({roomStatus: room_status});
    updateRoom(rid, null, 'Finish', (success, response) => {
      if (success) {

      }
      else {
        console.log(response);
      }
    });
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
            <Scrollbars style={{
              height: this.state.usersListHeight}}
              autoHide={true}
              thumbSize={50}
              autoHideTimeout={1500}
              hideTracksWhenNotNeeded={true}
              renderView={
                props =>
                <div {...props} className='custom-content'/>
              }
              renderTrackHorizontal={props =>
                <div {...props} className='track-horizontal'
                  style={{display:'none'}}/>}>
              {
                filteredUsers.map(user => {
                  if(this.props.userNameURL === user.userName) {
                    $('.place-holder-ui').css('display', 'none');
                  }
                  return(
                    <div className={
                      this.props.userNameURL === user.userName
                        ? 'user active-link ': 'user'}
                      key={user.user_id}>
                      {this.renderStatus(user.status)}
                      <Link to={'/chat/' + user.userName} key={user.uid}>
                        <List.Item key={user.uid}>
                          <Image avatar src={constant.API_BASE_URL + user.avatar.url}/>
                          <List.Content>
                            <List.Header>
                              {user.displayName}
                            </List.Header>
                          </List.Content>
                          {this.renderUnreadMessages(user.id)}
                        </List.Item>
                      </Link>
                    </div>
                  );
                })
              }
            </Scrollbars>
          </List>
        </div>
        {
          this.state.users.map((user, idx) => {
            return(
              <Switch>
                <Route path={'/chat/' + user.userName}
                  render={
                    (props) => (
                      <ChatContent {...props}
                        changeRoomStatus={this.changeRoomStatus.bind(this, this.state.roomIds[idx])}
                        targetUser={user}
                        currentUser={this.state.currentUser}
                        emitter={this.emitter}
                        currentRoomStatus={this.state.roomStatus[idx]}
                        currentRoomId={this.state.roomIds[idx]}/>
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
        {this.state.isloading ? <Loading /> : <div>{this.renderView()}</div>}
      </div>
    )
  }
}

export default ChatView;
