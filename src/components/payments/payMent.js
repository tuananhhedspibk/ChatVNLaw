import React, { Component } from 'react';
import $ from 'jquery';
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';
import Nav from '../homepage/nav';

import MyStoreCheckout from './MyStoreCheckout';

class payMent extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: []
        }
    }

    render() {
        return (
            <StripeProvider apiKey="pk_test_hMAhurESJYk43Gb4GOVtzUIM">
                <MyStoreCheckout info={this.props.fullInfo}/>
            </StripeProvider>
        );
    }
}

export default payMent;