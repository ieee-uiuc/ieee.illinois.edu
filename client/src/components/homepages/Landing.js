import React, { useContext } from 'react'
import './Landing.scss'
import alma from '../../images/AlmaVector.svg'
import eceb from '../../images/ECEB.jpg'
import { Link } from 'react-router-dom'
import FadeIn from '../../FadeIn';
import { scroller } from 'react-scroll';

const Landing = () => {

    const scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 750,
            delay: 10,
            smooth: true,
            offset: -80
        })
    }

    return (
        <div className="landing">
            <div class="landing__image">
                <img alt="" src={eceb} />
                <div class="landing__image__overlay" />
            </div>
            <div class="landing__content">
                <FadeIn direction={'left'}>
                    <div className="landing__content__text">
                        <p className="landing__content__text__title">
                            <div class="ieee">IEEE</div>
                            <div class="uiuc">UIUC</div>
                        </p>
                        <i className="landing__content__text__content">
                            Join us for events such as tech talks, info sessions, luncheons, workshops, and socials!
                        </i>
                        <div class="button effect">
                            <ul>
                                <li><a href="/about">About</a></li>
                                <li><a href="/sign-up">Join</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="container">
                        <div onClick={() => scrollToElement('Social')} class="arrow-container animated">
                            <div class="arrow-2">
                                <i class="fa fa-angle-down"></i>
                            </div>
                            <div class="arrow-1 animated hinge zoomIn"></div>
                        </div>
                    </div>
                </FadeIn>
            </div>


        </div >
    )
}

export default Landing