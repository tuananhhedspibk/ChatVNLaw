import React, {Component} from 'react';
import $ from 'jquery';

const firebase = require('firebase');
let translate = require('counterpart');

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      targetUser: '',
      result: []
    }
  }

  handleInputChange(evt){
    const target = evt.target;
    const value = target.value;
    this.setState({
      userName: value
    });
  }

  handleSubmit(evt) {
    var component = this;
    evt.preventDefault();
    var ref = firebase.database().ref(`users`)
      .orderByChild('displayName')
      .equalTo(this.state.userName).once('value', (data)=> {
        if(data.val() !== null){
          var arr = [];
          for(var y in data.val()){
            var item = {
              username: data.val()[y]['username'],
              displayName: data.val()[y]['displayName'],
              uid : y,
              status: data.val()[y]['status'],
              photoURL: data.val()[y]['photoURL']
            };
            arr.push(item);
          }
          component.setState({result: arr})
        }
        else{
          component.setState({result: []})
          $('.error-search-name').css('display', 'block');
          $('.error-search-name')
              .text(translate('app.dashboard.search.search_user_not_found'));
          $('.error-search-name-symbol').css('display', 'block');
          $('.error-search-name-symbol')
            .text(translate('app.dashboard.search.search_user_not_found_symbol'));
        }
    });
  }

  clickUser(data){
    var component = this;
    component.setState({
      targetUser: data
    })
    this.props.emitter.emit('getUserSearch', data);
    document.body.classList.remove('chat-section-hidden');
    $('.video-call').hide();
  }

  renderResult(){
    if(this.state.result.length > 0){
      return(
        <div className='users-result'>
          {this.state.result.map(element=>{
            return(
              <div className='user-result'
                onClick={this.clickUser.bind(this,element)}>
                  <img className='user-ava'
                    src={element.photoURL}
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
    return (
      <div className='search-user'>
        <form className='form-search'
          onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' placeholder={translate('app.dashboard.search.input_user_name')}
              onInput={this.handleInputChange.bind(this)} />
            <button type='submit'>
              {translate('app.dashboard.search.title')}
            </button>
          </form>
          {this.renderResult()}
      </div>
    )
  }
}

export default SearchUser;
