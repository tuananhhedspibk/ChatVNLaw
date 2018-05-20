import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import request from 'superagent';
import $ from 'jquery';

require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css');

const CALENDAR_ID = 'lkbc.team@gmail.com';
const API_KEY = 'AIzaSyDX8G3uBcHdi3RP5AhBWjRL94GbJRpDEZE';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

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
