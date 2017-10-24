import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import request from 'superagent';
import $ from 'jquery';

require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css');

const CALENDAR_ID = '2qm6bc113of43opcqnsiernk5s@group.calendar.google.com';
const API_KEY = 'AIzaSyCGFci7s06zoPhyF0d92Lu57BpGOkiszy0';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          console.log(event.htmlLink)
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

  componentDidMount () {
    getEvents((events) => {
      this.setState({events: events})
    });
    $('main.main').removeClass('main-customer');
  }

  showDescription(events){
    window.open(events.url_description)
    // window.gapi.client.calendar.events.insert({
    //   'calendarId': CALENDAR_ID,
    //   'resource': a
    // });
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
