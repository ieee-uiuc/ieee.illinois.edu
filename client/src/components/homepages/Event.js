import React, { useState } from 'react'
import './Events.scss'
import Popup from './subpages/Popup'
import { ClickHandler } from "./functions/ClickHandler"

const Event = (props) => {

  const [isOpen, setIsOpen] = useState(false)

  function callTwo() {
    ClickHandler(`${props.title}`, "events")
    setIsOpen(!isOpen)
  }

    return (
      <div className="clear">
        <button
          className="single-event"
          onClick={callTwo}
          key={props.id}
        >
          <div className="single-event__overlay">
            <div className="single-event__content">
              <div className="single-event__content__title">{props.title}</div>
            </div>
          </div>
        </button>
        <div>
          <Popup
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            location={props.location}
            key={props.key}
            image={props.image}
            title={props.title}
            date={props.date}
            description={props.description}
            link={props.link}
            linkName={props.linkName}
          />
        </div>
      </div>
    )
}

export default Event