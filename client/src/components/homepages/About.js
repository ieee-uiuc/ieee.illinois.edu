import React, { useContext } from 'react'
import './About.scss'
import { DataContext } from '../Context/GlobalContext'
import { Link } from 'react-router-dom'
import FadeIn from '../../FadeIn'
import {ClickHandler} from './functions/ClickHandler'


const About = () => {

    const state = useContext(DataContext)
    const [about] = state.about
    const [dataAbout] = state.dataAbout
    // console.log(about)

    return (
      <div className="margin-about">
        <FadeIn direction={"right"}>
          <div className="about">
            <div className="about__title">About IEEE UIUC</div>
            {dataAbout && <div className="about__text">loading about...</div>}
            {!dataAbout && (
              <div className="about__text">
                {about.map((item) => item.about)}
              </div>
            )}
            <div className="about__button-container">
              <Link
                onClick={ClickHandler('join', 'About')}
                to={"/join"}
                className="about__button-container__button"
              >
                join
              </Link>
              <Link
                onClick={ClickHandler('board', 'About')}
                to={"/board"}
                className="about__button-container__button"
              >
                our team
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    )
}

export default About