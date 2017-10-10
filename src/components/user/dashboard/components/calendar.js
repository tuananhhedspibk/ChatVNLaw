import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import request from 'superagent';

require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css')
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
    })
  }

  showDescription(events){
    window.open(events.url_description)
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
