import React, { useState } from 'react'
import './Contact.scss'
import axios from 'axios'
// import Load from '../../images/load2.gif'

const Contact = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [banner, setBanner] = useState('')
    const [bool, setBool] = useState(false)

    //inputs
    const handleNameChange = (e) => {
        setName(e.target.value)
        // console.log(name)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        // console.log(email)
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
        // console.log(message)
    }

    //submit form

    const formSubmit = async (e) => {
        e.preventDefault()
        let data = {
            name: name,
            email: email,
            message: message
        }

        setBool(true)
        try {
            const res = await axios.post('/contact', data)
            setBanner(res.data.msg)
            setBool(false)
            setTimeout(() => {
                setBanner('')
            }, 2000)
            setName('')
            setEmail('')
            setMessage('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="contact">
            <p className="contact__title">Contact</p>
            <div className="contact__container">
                {/* <div className="contact__container__form">
                    <div className="contact__container__form__content">
                        <form onSubmit={formSubmit}>
                            <p>{banner}</p>
                            <p className="contact__lable" htmlFor="name">Name</p>
                            <input
                                className="contact__name"
                                value={name}
                                onChange={handleNameChange}
                                type="text"
                                placeholder="input name..."
                                required />
                            <p className="contact__lable" htmlFor="email">Email</p>
                            <input
                                className="contact__email"
                                value={email}
                                onChange={handleEmailChange}
                                type="text"
                                placeholder="input email..."
                                required />
                            <p className="contact__lable" htmlFor="message">message</p>
                            <textarea
                                className="contact__message"
                                value={message}
                                onChange={handleMessageChange}
                                name="message"
                                type="text"
                                id=""
                                placeholder="input message..."
                                required />
                            <div className="send-btn">
                                <button type="submit">Send{bool ? <b className="load" ><img src={Load} /></b> : ''}</button>
                            </div>
                        </form>
                    </div>

                </div> */}
                <div className="contact__container__info">
                    <p className="contact__container__info__title">
                        Mailing Address:
                    </p>
                    <i className="contact__container__info__text">
                        IEEE UIUC Student Branch
                        <br />ECE Building, Room 1016
                        <br />306 N. Wright St.
                        <br />Urbana, IL 61801
                    </i>
                    <p className="contact__container__info__title">
                        Email Address:
                    </p>
                    <i className="contact__container__info__text">
                        ieee.uiuc@gmail.com
                    </i>
                    <p className="contact__container__info__title__social">
                        Socials:
                    </p>
                    <div className="contact-media">
                        <a href="https://github.com/ieee-uiuc" alt="github" className="fab fa-github"></a>
                        <a href="https://www.facebook.com/ieeeuiuc" alt="facebook" className="fab fa-facebook"></a>
                        <a href="https://www.instagram.com/ieee.uiuc/" alt="instagram" className="fab fa-instagram"></a>
                        <a href="https://discord.gg/Gc9qPBxzbS" alt="discord" className="fab fa-discord"></a>
                    </div>
                </div>
            </div>
            {/* <div className="main-container">
            <div className="contactForm">
                <h2 className="title">Contact</h2>
                <div className="contactForm-center">
                    <div className="contact_form">
                        <form onSubmit={formSubmit}>
                            <p>{banner}</p>
                            <lable htmlFor="name">Name</lable>
                            <input
                                value={name}
                                onChange={handleNameChange}
                                type="text"
                                placeholder="input name..."
                                required />
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={handleEmailChange}
                                type="text"
                                placeholder="input email..."
                                required />
                            <label htmlFor="message">message</label>
                            <textarea
                                value={message}
                                onChange={handleMessageChange}
                                name="message"
                                type="text"
                                id=""
                                placeholder="input message..."
                                required />
                            <div className="send-btn">
                                <button type="submit">Send{bool? <b className="load" ><img src={Load} /></b>:''}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> */}
        </div>
    )
}

export default Contact