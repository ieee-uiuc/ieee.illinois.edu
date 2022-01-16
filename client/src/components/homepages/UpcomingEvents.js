import React, { useContext } from 'react'
import './Events.scss'
import { DataContext } from '../Context/GlobalContext'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Event from './Event'

const UpcomingEvents = () => {

    const state = useContext(DataContext)
    const [events] = state.events
    const [dataEvents] = state.dataEvents

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 2000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 620, min: 0 },
            items: 1
        }
    };


    return (
        <div>
            <div className='container-event-title'>
                <h1 className='event-page-title' >Upcoming Events:</h1>
            </div>

            {dataEvents
                ? <Event key={'loading...'} image={'loading...'} title={'loading...'} date={'loading...'} description={'loading...'} location={'loading...'} />

                : <Carousel
                    swipeable={true}
                    draggable={true}
                    // showThumbs={false}
                    infiniteLoop={true}
                    responsive={responsive}
                    customTransition="transform 400ms ease-in-out"
                    transitionDuration={300}
                    infinite={true}
                    minimumTouchDrag={50}
                // autoPlay={true}
                // overflow={true}
                // centerMode={true}
                // showDots={true}
                // renderDotsOutside={true}
                >
                    {events.map((item) => (
                        item.upcoming && <Event key={item.id} image={item.images.url} title={item.title} date={item.date} description={item.description} location={item.location} />
                    ))}
                </Carousel >
            }
        </div>
    )
}

export default UpcomingEvents