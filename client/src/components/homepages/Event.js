import React, { useState } from 'react'
import './Events.scss'
import Popup from './subpages/Popup'

const Event = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='clear'>
            <button className="single-event" onClick={() => setIsOpen(!isOpen)} key={props.id}>
                <div className="single-event__overlay" >
                    <div className="single-event__content">
                        <div className='single-event__content__title'>{props.title}</div>
                    </div>
                </div>
            </button>
            <div >
                <Popup setIsOpen={setIsOpen} isOpen={isOpen} location={props.location} key={props.key} image={props.image} title={props.title} date={props.date} description={props.description} />
            </div>
        </div>
    )
}

export default Event