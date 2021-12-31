import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import scrollGridPlugin from '@fullcalendar/scrollgrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from "@fullcalendar/interaction";
import './Calendar.scss'

require('dotenv').config()

const API = process.env.REACT_APP_GOOGLE_API_KEY

export default class Calendar extends Component {


    render() {
        let INITIAL_EVENTS = [
            {
                googleCalendarId: '4na3juef6r10antnbtmniav7nc@group.calendar.google.com',
                className:'event'
            }
        ]
        return (
            <div className="calendar">
                <div className="calendar__container">
                    <FullCalendar
                        plugins={[dayGridPlugin, googleCalendarPlugin, timeGridPlugin, scrollGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        googleCalendarApiKey={API}
                        eventSources={INITIAL_EVENTS}
                        allDaySlot={false}
                        height='80vh'
                        expandRows={true}
                        headerToolbar={{
                            left: "today timeGridDay,timeGridWeek,dayGridMonth",
                            center: "title",
                            right: "prev,next"
                        }}
                        // veiws={
                        //     dayGridMonth={
                        //         dayMinWidth:5
                        //     }
                        // }
                        slotMinTime="10:00:00"
                        slotMaxTime="20:00:00"
                        dayMinWidth={200}
                        stickyFooterScrollbar={true}
                        eventColor= '#0F3D59'
                        eventBackgroundColor= '#0F3D59'
                        progressiveEventRendering='true'
                    />
                </div>
            </div>
        )
    }
}
