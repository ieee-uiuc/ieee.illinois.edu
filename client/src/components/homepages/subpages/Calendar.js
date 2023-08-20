import React, { Component } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import scrollGridPlugin from "@fullcalendar/scrollgrid"
import googleCalendarPlugin from "@fullcalendar/google-calendar"
import "./Calendar.scss"

const API = process.env.REACT_APP_GOOGLE_API_KEY

export default class Calendar extends Component {
  render() {
    let INITIAL_EVENTS = [
      {
        googleCalendarId: process.env.REACT_APP_GOOGLE_CALENDAR,
      },
    ]
    return (
      <div className="calendar">
        <div className="cal-text">
          <h1 className="cal-title">Calendar</h1>
          <a
            href="https://calendar.google.com/calendar/ical/03688n0hmd9vkbv1mp0ollaue0%40group.calendar.google.com/public/basic.ics"
            target="_blank"
            className="add-cal"
          >
            import calendar
          </a>
        </div>
        <div className="calendar__container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              googleCalendarPlugin,
              timeGridPlugin,
              scrollGridPlugin,
            ]}
            initialView="timeGridWeek"
            googleCalendarApiKey={API}
            eventSources={INITIAL_EVENTS}
            allDaySlot={false}
            height="80vh"
            headerToolbar={{
              start: "title",
              center: "",
              end: "today",
            }}
            footerToolbar={{
              start: "timeGridDay timeGridWeek dayGridMonth",
              end: "prev,next",
            }}
            slotMinTime="10:00:00"
            slotMaxTime="22:00:00"
            dayMinWidth={10}
            stickyFooterScrollbar={true}
            eventColor="#0F3D59"
            eventBackgroundColor="#0F3D59"
            progressiveEventRendering={true}
            expandRows={true}
            eventClick={function (info) {
              var eventObj = info.event
              alert(
                `${eventObj.title}: \n${eventObj.start}  -\n${eventObj.end} \n${eventObj.url}`
              )
              info.jsEvent.preventDefault()
            }}
          />
        </div>
      </div>
    )
  }
}
