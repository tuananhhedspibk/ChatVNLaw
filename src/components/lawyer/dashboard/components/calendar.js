import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import request from 'superagent';
import $ from 'jquery';
import * as constant from '../../../constants';

require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css');

const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyBMem-ZKdVhPS2uwB3gXLPtD1YdQQthDK0';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
var firebase = require('firebase');

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.dateTime,
            end: event.end.dateTime,
            title: event.summary,
            description: event.description,
            id: event.id,
            url_description: event.htmlLink,
          })
        })
        callback(events)
      }
    })
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    tooltipOpen: false,
    events:[],   
    }
  }

  componentDidMount () {
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/calendar');
    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
      
    }).catch(function(error) {
      console.log(error);
    });

    
    getEvents((events) => {
      this.setState({events: events})
    });
    $('main.main').removeClass('main-customer');

  }

  showDescription(events){
    window.open(events.url_description);
  }

  render() {
    return (
      <div id='calendar'>
        <FullCalendar
          id = '1'
          header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          }}
          eventClick = {this.showDescription.bind(this.state.events)}
          navLinks= {true} 
          editable= {true}
          eventLimit= {true} 
          dragScroll = {true}
          height = {500}
          events = {this.state.events}/>
      </div>
    );
  }
}

export default Calendar;
