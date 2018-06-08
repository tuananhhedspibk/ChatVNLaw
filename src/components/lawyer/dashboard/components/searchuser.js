import React, {Component} from 'react';
import $ from 'jquery';
import SearchInput, {createFilter} from 'react-search-input';

import { getAllRooms } from '../../../../lib/room/rooms';
import * as translate from 'counterpart';
import * as constant from '../../../constants';

const KEYS_TO_FILTERS = ['displayName'];

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      users: [],
      searchTerm: ''
    }
  }

  componentWillMount() {
    var component = this;
    getAllRooms( (success, response) =>{
      if (success) {
        var users = []
        for (var i in response.data.rooms) {
          var user = {
            rid: response.data.rooms[i].id,
            uid: response.data.rooms[i].user.uid,
            displayName: response.data.rooms[i].user.displayName,
            photoURL: response.data.rooms[i].user.avatar.url
          }
          users.push(user) 
        }
        component.setState({
          users: users
        });
      }
    })
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  clickUser(data){
    this.props.emitter.emit('getUserSearch', data);
    document.body.classList.remove('chat-section-hidden');
    $('.user-result').css('background-color', '#f6f6f6');
    $('#user-' + data.uid).css('background-color', '#e5ecf0');
    if ($('#open-chat-btn').css('display') !== 'none'){
      $('#open-chat-btn').fadeOut();
      $('#close-chat-btn').fadeIn();
    }
    $('.video-call').hide();
  }

  renderResult(filteredUsers){
    if(filteredUsers.length > 0){
      return(
        <div className='users-result'>
          {filteredUsers.map(element=>{
            return(
              <div className='user-result' id={'user-' + element.uid}
                onClick={this.clickUser.bind(this,element)}>
                  <img className='user-ava' alt='ava'
                    src={constant.API_BASE_URL + element.photoURL}
                    title={element.displayName}/>
                  <div className='user-name'>
                    {element.displayName}
                  </div>
              </div>
            )
          })}
        </div>
      )
    }
    else{
      return(
        <div className='error-result'>
          <p className='error-search-name'></p>
          <p className='error-search-name-symbol'></p>
        </div>
      )
    }
  }

  render(){
    const filteredUsers = this.state.users.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <div className='search-user search-feature'>
        <div className='search-box'>
          <SearchInput className='search-input'
            onChange={this.searchUpdated.bind(this)}
            placeholder={translate('app.user.search') + '...'} />
        </div>
          {this.renderResult(filteredUsers)}
      </div>
    )
  }
}

export default SearchUser;
