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
      targetUser: '',
      result: [],
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
          users: users,
          result: users
        });
      }
    })
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  clickUser(data){
    var component = this;
    component.setState({
      targetUser: data.users
    })
    this.props.emitter.emit('getUserSearch', data);
    document.body.classList.remove('chat-section-hidden');
    $('.video-call').hide();
  }

  renderResult(filteredUsers){
    if(filteredUsers.length > 0){
      return(
        <div className='users-result'>
          {filteredUsers.map(element=>{
            return(
              <div className='user-result'
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
