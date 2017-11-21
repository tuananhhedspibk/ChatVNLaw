import React, { Component } from 'react';
import {render} from 'react-dom';
import {CardElement} from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import firebase from 'firebase';

import * as constant from '../constants';
import * as userInfo from '../../lib/user/getuserinfo';
import * as translate from 'counterpart';

class CardSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  componentWillMount(){
    var user = firebase.auth().currentUser
    this.setState({
      currentUser : user
    })
  }

  handleSubmit = ev => {
    var component = this;
    var roomId;
    var reference = this.state.currentUser.uid + this.props.info[0]['uidLawyer']
    firebase.database().ref(`reference/${reference}`).once('value', data => {
      if(data) {
        roomId = data.val()
      }
    })
    ev.preventDefault();
    this.props.stripe.createToken({name: component.state.currentUser.displayName}).then(({token}) => {
      if(typeof(token) === "object"){
        var uidLawyer = component.props.info[0]['uidLawyer']
        userInfo.getUserName(firebase.auth().currentUser,function(result){
          firebase.database().ref(`moneyAccount/${component.state.currentUser.uid}`).update(token)
          if(!!roomId){
            var ref = firebase.database().ref(`rooms/`+roomId['roomId'])
            ref.update({description: component.props.info[0]['info']})
            firebase.database().ref(`users/${uidLawyer}/username`).once('value', data => {
              if(data) {
                var username = data.val()
                window.location = constant.BASE_URL + '/chat/' + username;
              }
            })
          }
          else {
            var roomKey = firebase.database().ref(`rooms`).push().key
            firebase.database().ref(`rooms/${roomKey}`).set({description: component.props.info[0]['info']})
            firebase.database().ref(`rooms/${roomKey}/members`).set({customer: component.state.currentUser.uid, lawyer: component.props.info[0]['uidLawyer']})
            var postKey = firebase.database().ref(`reference/${reference}`).set({roomId: roomKey})
            firebase.database().ref(`users/${uidLawyer}/username`).once('value', data => {
              if(data) {
                var username = data.val()
                window.location = constant.BASE_URL + '/chat/' + username
              }
            })
          }
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
        <button className="payment-bt">{translate('app.payment.connect')}</button>
      </form>
    );
  }
};
  
export default injectStripe(CardSection);