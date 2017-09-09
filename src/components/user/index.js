import React, { Component } from 'react';
import { List, Image, Input } from 'semantic-ui-react';

import * as constant from '../constants';
import avaLawyer from '../../assets/images/default-ava-lawyer.png';

import '../../assets/styles/user_index.css';

let FontAwesome = require('react-fontawesome');
let user = require('../../lib/api/users');
let translate = require('counterpart');

class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    var fields = constant.DEFAULT_FIELDS;
    var query = constant.DEFAULT_QUERY;

    fields["username"] = 1;

    query["roles"].push("user");
    query["roles"].push("bot");    

    var component = this;

    user.list(fields,query,function(response){
      component.setState({users: response.data.users});
    });
  }

  render() {
    return (
      <div className='list-users'>
        <div className='header-index'>
          <FontAwesome name='cog'/>
          {translate('app.identifier.app_name')}
        </div>
        <List>
          <div className='search-box'>
            <Input icon='search'
              placeholder={translate("app.user.search") +  '...'}/>
          </div>
          {
            this.state.users.map(user => (
              <List.Item key={user._id}>
                <Image avatar src={avaLawyer}/>
                <List.Content>
                  <List.Header>{user.username}</List.Header>
                  <List.Description>Online</List.Description>
                </List.Content>
                <List.Content floated='right'>
                  <div className='status'></div>
                </List.Content>
              </List.Item>
            ))
          }
        </List>
      </div>
    )
  }
}

export default UsersIndex;
