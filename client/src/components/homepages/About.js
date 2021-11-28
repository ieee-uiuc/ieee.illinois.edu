import React, { useContext } from 'react'
import './About.scss'
import { DataContext } from '../Context/GlobalContext'
import alma from '../../images/AlmaVector.svg'
import { Link } from 'react-router-dom'

const About = () => {

    const state = useContext(DataContext)
    const [about] = state.about
    // console.log(about)

    return (
        <div className="about">
            <div className="about__container">
                <div className="about__image">
                    <img alt="alma" className="about__container__alma" src={alma} />
                </div>
                <div className="about__content">
                    <div className="about__title">
                        IEEE UIUC Branch
                    </div>
                    {about.map(item => (
                        <div className="about__text" key={item._id}>
                            <p>
                                {item.about}
                            </p>
                        </div>
                    ))}
                    <div className="about__button__spacing">
                        <Link to='/board' className="about__button">
                            <div className="about__button__text">
                                <a>Board</a>
                            </div>
                        </Link>
                        <Link to='/sign-up' className="about__button">
                            <div className="about__button__text">
                                <a>Join</a>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About