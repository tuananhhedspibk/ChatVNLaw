import React, {Component} from 'react';
import $ from 'jquery';
import ChatBubble from 'react-chat-bubble';

import * as Messages from '../../../../lib/helper/messages/messages';

let translate = require('counterpart');

class SearchTag extends Component {
  constructor(props) {
    super(props);
    this.state ={
      currentUser: '',
      targetUser: '',
      currentRoomId :'',
      tagResults: [],
      messages: [],
      currentResultIndex: 0,
      keyword: ''
    };
    this.currentUser= null;
  }

  componentWillMount(){
    var component = this;
    this.props.emitter.emit('ReSendData', function(currentUser, targetUser, roomId){
      component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId})
      component.currentUser = currentUser;
      $('#search-input-box').val('');
    });

    this.props.emitter.addListener('RoomChatHasChanged',
      function(currentUser, targetUser,roomId) {
        component.setState({currentUser: currentUser,
          targetUser: targetUser,
          currentRoomId: roomId})            
        component.currentUser = currentUser;
        $('#search-input-box').val('');
    });
  }

  componentWillUpdate(nextProps,nextState){
    if(this.state.currentRoomId !== nextState.currentRoomId){
      this.setState({tagResults: [],
        messages: [],
        currentResultIndex: 0,
        keyword: ''})
    }
  }

  searchTag(evt){
    evt.preventDefault();
    var component = this;
    var searchInputBox = $('#search-input-box')
    this.setState({keyword: searchInputBox.val()})
    
    if(searchInputBox.val()){
        let properties = {}
        properties['component'] = component;
        properties['keyword'] = searchInputBox.val();
        Messages.searchTag(properties, function(){
            component.loadMessage(component);
        });        
    }
    searchInputBox.val('');
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.currentResultIndex !== prevState.currentResultIndex){
      this.loadMessage(this);
    }
  }
  
  prevResult(evt){
    if(this.state.currentResultIndex !== 0){
      let prevIndex = this.state.currentResultIndex - 1;
      this.setState({currentResultIndex: prevIndex});
    }
  }

  nextResult(evt){
    if(this.state.currentResultIndex !== this.state.tagResults.length -1){
      let nextIndex = this.state.currentResultIndex + 1;
      this.setState({currentResultIndex: nextIndex})
    }
  }

  loadMessage(component){
    let properties = {}
    properties['roomId'] = component.state.currentRoomId;
    properties['ts'] =
      component.state.tagResults[component.state.currentResultIndex]
        .data.msg_ts;
    properties['limit'] = 15
    properties['component'] = component;
    Messages.loadTagNextMessages(properties);
  }

  renderResult(){
    if(this.state.tagResults.length > 0){
      return(
        <div className='search-results'>
          <div className='results-statistic'>
            <button className='direction-btn'
              onClick={this.prevResult.bind(this)}>
              <i className='fa fa-chevron-up'
                aria-hidden='true'></i>
            </button>
            <button className='direction-btn'
              onClick={this.nextResult.bind(this)}>
              <i className='fa fa-chevron-down'
                aria-hidden='true'></i>
            </button>
            <p className='statistic-content'>
              {(this.state.currentResultIndex+1) + '/' +
              (this.state.tagResults.length) +
                translate('app.dashboard.search.result_for')
                + (this.state.keyword) }</p>
          </div>
          <ChatBubble messages={this.state.messages} 
            targetUser={this.state.targetUser}
            currentUser={this.state.currentUser}/>
        </div>
      )
    }
    else {
      if (this.state.keyword !== '') {
        return(
          <div className='not-found'>
            <div className='content'>
              {translate('app.dashboard.search.search_tag_not_found')}
            </div>
            <div className='symbol'>
              {translate('app.dashboard.search.search_tag_not_found_symbol')}
            </div>
          </div>
        )
      }
    }
  }

  render(){
    if(this.state.currentRoomId){
      return (
        <div className='search-feature search-tag'>
          <form className='form-search'
            onSubmit={this.searchTag.bind(this)}>
            <input type='text'
              placeholder={translate('app.dashboard.search.by_tag')}
              id='search-input-box'/>
            <button id='search-button'
              onClick={this.searchTag.bind(this)}>
                {translate('app.dashboard.search.title')}
            </button>
          </form>
          {this.renderResult()}
        </div>
      )
    }
    else{
      return(
        <div></div>
      )
    }  
  }
}

export default SearchTag;
