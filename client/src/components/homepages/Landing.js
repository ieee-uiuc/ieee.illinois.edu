import React, { lazy, Suspense } from "react"
import "./Landing.scss"
import FadeIn from "../../FadeIn"
import { scroller } from "react-scroll"
import eceb_small from "../../images/eceb-tiny.jpg"
const eceb = lazy(() => import("../../images/eceb-large.jpg"))

const Landing = () => {
  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 750,
      delay: 10,
      smooth: true,
      offset: -80,
    })
    // console.log('scroll')
  }

  return (
    <div className="background">
      <FadeIn direction={"down"}>
        <div className="landing">
          <div className="landing__image">
            <Suspense fallback={eceb_small}>
              <img alt="" src={eceb} />
            </Suspense>
            <div className="landing__image__overlay" />
          </div>
          <div className="landing__content">
            <FadeIn direction={"down"}>
              <div className="landing__content__text">
                <div className="landing__content__text__title">
                  <div className="ieee">IEEE</div>
                  <div className="uiuc">UIUC</div>
                </div>
                <i className="landing__content__text__content">
                  Join us for events such as tech talks, info sessions,
                  luncheons, workshops, and socials!
                </i>
                {/* <div className="button effect">
                            <ul>
                                <li><a href="/about">About</a></li>
                                <li><a href="/sign-up">Join</a></li>
                            </ul>
                        </div> */}
              </div>
            </FadeIn>
            <div className="container">
              <div
                onClick={() => scrollToElement("about")}
                className="arrow-container animated"
              >
                <div className="arrow-2">
                  <i className="fa fa-angle-down"></i>
                </div>
                <div className="arrow-1 animated hinge zoomIn"></div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

export default Landing
