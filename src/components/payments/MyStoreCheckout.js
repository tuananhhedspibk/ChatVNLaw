import React, { Component } from 'react';
import $ from 'jquery';
import {render} from 'react-dom';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
    render() {
      return (
        <Elements>
          <CheckoutForm />
        </Elements>
      );
    }
  }
  
  export default MyStoreCheckout;