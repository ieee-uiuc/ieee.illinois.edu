import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const AboutAdmin = () => {

    const [about, setAbout] = useState('')
    const [aboutData, setAboutData] = useState([])
    const [message, setMessage] = useState('')
    const [messageCond, setMessageCond] = useState(false)

    const fetchData = async () => {
        try {
            const res = await axios.get(`/fetchabout`)
            // console.log(res.data)
            setAboutData(res.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onChangeAbout = (e) => {
        setAbout(e.target.value)
        //console.log(about)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('clicked')
        try {
            const res = await axios.post(`/fetchabout`, { about })
            setMessage(res.data.msg)
            setTimeout(() => {
                setMessage('')
            }, 2000)
            setAbout('')
            // setAboutData([...aboutData,{about}])
        } catch (error) {
            //console.log(error)
        }
    }

    const deleteAbout = async (id) => {

        try {
            const res = await axios.delete(`/fetchabout/${id}`)
            setMessageCond(true)
            setMessage(`${res.data.msg}`)
            setTimeout(() => {
                setMessageCond(false)
                setMessage('')
            }, 2000)
        } catch (error) {
            console.log(error)
        }

        //delete from ui
        const aboutFilterDel = aboutData.filter(item => item._id !== id)

        setAboutData(aboutFilterDel)
    }

    return (
        <div className="same-component">
            <div className="same-form">
                <form onSubmit={handleSubmit}>
                    <h4>About Component</h4>
                    <label htmlFor="text">About</label>
                    <textarea
                        value={about}
                        onChange={onChangeAbout}
                        name="textarea"
                        cols="30"
                        row="3" />
                    <button type="submit">add item</button>
                </form>
            </div>

            <div className="same-item">
                {aboutData.map((item) => (
                    <div className="about-info" key={item._id}>
                        <div className="icons">
                            <Link to={`/editAbout/${item._id}`}><i className="fas fa-edit"></i></Link>
                            <i className="fas fa-trash" onClick={() => deleteAbout(item._id)}></i>
                        </div>
                        <p>{item.about}</p>
                    </div>
                ))}
                <h3 className={messageCond ? "new-delete item-delete-tab" : "item-delete-tab"}>{message}</h3>
            </div>

        </div>
    )
}

export default AboutAdmin