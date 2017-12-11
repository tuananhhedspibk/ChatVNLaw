import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import request from 'superagent';
import $ from 'jquery';
import * as constant from '../../../constants';

require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css');

const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyBMem-ZKdVhPS2uwB3gXLPtD1YdQQthDK0';
// AIzaSyBMem-ZKdVhPS2uwB3gXLPtD1YdQQthDK0
const CLIENT_ID = '846136360643-i2kk8tl8nucosbe123gj9rh1q925f4j0.apps.googleusercontent.com'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
var firebase = require('firebase');



export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          // console.log(event.htmlLink)
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

let a = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    tooltipOpen: false,
    events:[],   
    }
  }
  componentWillMount() {





// firebase.auth().signInWithPopup(provider).then(function(authData) {
//   console.log(authData);
// }).catch(function(error) {
//   console.log(error);
// });
  }

  componentDidMount () {
        if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
    console.log(firebase.auth().currentUser)
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/calendar');
    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
  // Accounts successfully linked.
      var credential = result.credential;
      var user = result.user;
      console.log(result)
      console.log(result.user)
      console.log(credential)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      // ...
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
