import React, { Component } from 'react';
import {render} from 'react-dom';
import {CardElement} from 'react-stripe-elements';
import * as constant from '../constants';
import {StripeProvider} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';

const firebase = require('firebase');


class CardSection extends React.Component {
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      if(typeof(token) === "object"){
        window.location = constant.BASE_URL + '/chat' + firebase.auth().currentUser.username;
      }
    });
    // this.props.stripe.paymentRequest().then(payload => console.log(typeof(payload)));
  };
  render() {
    console.log(firebase.auth().currentUser)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <button className="payment-bt">Next</button>
      </form>
    );
  }
};
  
export default injectStripe(CardSection);