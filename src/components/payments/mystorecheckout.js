import React, { Component } from 'react';
import $ from 'jquery';
import {render} from 'react-dom';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './checkoutform';

class MyStoreCheckout extends React.Component {

    constructor(props){
      super(props);
    }

    render() {
      return (
        <Elements>
          <CheckoutForm info={this.props.info}/>
        </Elements>
      );
    }
  }
  
  export default MyStoreCheckout;