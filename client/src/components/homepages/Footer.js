import React from 'react'
import { Link } from 'react-router-dom'
import { scroller } from "react-scroll"
import './Footer.scss'

const Footer = () => {

    // for scralli navbar elements
    const scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 800,
            delay: 50,
            smooth: true,
            offset: -80
        })
    }

    return (
        <React.Fragment>

            <div className="main-contact">

                <div className="footer">
                    <p>IEEE UIUC Branch 2021</p>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Footer