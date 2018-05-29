import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import axios from 'axios';
import $ from 'jquery';

import * as translate from 'counterpart';

import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

const CALENDAR_ID = 'lkbc.team@gmail.com';
const API_KEY = 'AIzaSyDX8G3uBcHdi3RP5AhBWjRL94GbJRpDEZE';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

export function getEvents (component, callback) {
  axios.get(url)
    .then(response => {
      const events = [];
      response.data.items.map((event) => {
        events.push({
          start: event.start.dateTime,
          end: event.end.dateTime,
          title: event.summary,
          description: event.description,
          id: event.id,
          url_description: event.htmlLink,
        })
      })
      callback(events);
    })
    .catch(error => {
      component.toastError(component);
    });
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],   
    }
  }

  componentDidMount () {
    getEvents(this, events => {
      this.setState({events: events});
    });
    $('main.main').removeClass('main-customer');
  }

  toastError(component) {
    component.props.emitter.emit('AddNewErrorToast',
    translate('app.system_notice.error.title'),
    translate('app.system_notice.error.text.some_thing_not_work'),
    5000, ()=>{});
  }

  showDescription(events){
    window.open(events.url_description);
  }

  render() {
    return (
      <div id='calendar'>
        <FullCalendar
          id='1'
          header={{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          }}
          eventClick={this.showDescription.bind(this.state.events)}
          navLinks={true} 
          editable={true}
          eventLimit={true} 
          dragScroll={true}
          height={500}
          events={this.state.events}/>
      </div>
    );
  }
}

export default Calendar;
