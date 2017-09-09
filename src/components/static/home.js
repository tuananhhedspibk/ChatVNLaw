import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';

import * as constant from '../constants';

let translate = require('counterpart');
// let user      = require('../../lib/api/users');
let chat = require('../../lib/api/chat');
class Home extends Component {
  renderView() {
    if (localStorage.rocket_chat_user == null) {
     window.location = constant.BASE_URL + constant.SIGN_IN_URI; 
    }
    else{

    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    // begin demo
    // var fields = constant.DEFAULT_FIELDS;
    // fields["emails"] = 1;
    
    // var query = constant.DEFAULT_QUERY;
		// query["roles"].push("user");
    // query["roles"].push("bot");
    
    // user.list(fields,query,function(response){
    //   console.log(response);
    // });

    chat.postMessage("n4wSXZfhPAWQfhbvZ","#linhtm123","test api","","","",[],function(response){
      console.log(response);
    });
    //end demo
  }
  render() {
    return (
      <div>
        {this.renderView()}
        {/* begin demo */}
        <Form className='authen-form' onSubmit={this.handleSubmit.bind(this)} method='post'>
          <Button primary type='submit'>
            {translate('app.login.submit')}
          </Button>
        </Form>
        {/* end demo */}
      </div>
    )
  }
}

export default Home;
