import React, { Component } from 'react';
import {render} from 'react-dom';
import {CardElement} from 'react-stripe-elements';
import * as constant from '../constants';
import {StripeProvider} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
const userInfo = require('../../lib/helper/user/get_user_info')
const firebase = require('firebase');

class CardSection extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      if(typeof(token) === "object"){
        userInfo.getUserName(firebase.auth().currentUser,function(result){
        // window.location = constant.BASE_URL + '/chat/' + result;
        console.log(this.props.info)
        })
      }
    });
  };
  render() {
    return (
      <form className='form-payment' onSubmit={this.handleSubmit}>
        <label>
          Card details
        </label>
        <CardElement />
        <button className="payment-bt">Next</button>
      </form>
    );
  }
};
  
export default injectStripe(CardSection);