import React, { useContext } from 'react'
import './Events.scss'
import { DataContext } from '../Context/GlobalContext'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Social = () => {

    const state = useContext(DataContext)
    const [social] = state.social
    // console.log(social)

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
        <div className="event-page">
            <div class="events-container">
                <div className="event-page__title">
                    Social Events
                </div>
                <div className="events">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        responsive={responsive}
                        customTransition="transform 400ms ease-in-out"
                        transitionDuration={300}
                        infinite={true}
                        minimumTouchDrag={50}
                        autoPlay={true}
                    // showDots={true}
                    // renderDotsOutside={true}

                    >
                        {social.map((item) => (
                            <div className="events__single-event" key={item._id}>
                                <div className="events__single-event__info">
                                    <div className="events__single-event__img">
                                        <img src={item.images.url} alt="" />
                                        <div className="events__overlay" />
                                    </div>
                                    <div class="events__single-event__info__content">
                                        <h3 className="events__single-event__info__content__title">
                                            {item.title}
                                        </h3>
                                        <p className="events__single-event__info__content__date">
                                            {item.date}
                                        </p>

                                        <p className="events__single-event__info__content__description">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

        </div>
    )
}

export default Social