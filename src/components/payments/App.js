import React, { Component } from 'react';
import $ from 'jquery';
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';
import Nav from '../homepage/nav';

import MyStoreCheckout from './MyStoreCheckout';

class App extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_test_hMAhurESJYk43Gb4GOVtzUIM">
                <MyStoreCheckout />
            </StripeProvider>
        );
    }
}

export default App;