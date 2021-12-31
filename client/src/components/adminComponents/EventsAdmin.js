import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    description: '',
    images: '',
    date: '',
    location: '',
    upcoming:null
}

const EventsAdmin = () => {

    const [event, setEvent] = useState(initialState)
    const [images, setImages] = useState(false)
    const [message, setMessage] = useState('')
    const [messageCond, setMessageCond] = useState(false)
    const [eventData, setEventData] = useState([])


    //upload
    const handleUpload = async (e) => {

        e.preventDefault();

        try {
            const file = e.target.files[0];
            if (!file) return alert('no files exist')

            if (file.size > 4096 * 2048) {
                return alert('size is too big')
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return alert('incorrect file format')
            }

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/upload', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })

            setImages(res.data);


        } catch (err) {
            console.log(err.response.data.msg);
        }

    }

    //delete
    const handleDestroy = async () => {
        try {
            await axios.post('/destroy', { public_id: images.public_id })
            setImages(false)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    //handle change
    const handleChangeInput = (e) => {

        const { name, value } = e.target

        setEvent({ ...event, [name]: value })
        // console.log(product.description)
        // console.log(product.title)
        // console.log(product.product_id)
    }

    //submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/event', { ...event, images })
            setMessage(res.data.msg)
            setTimeout(() => {
                setMessage('')
            }, 2000)
            setEvent(initialState)
            setImages(false)
        } catch (error) {
            console.log(error)
        }
    }

    const styleUpload = {
        display: images ? 'block' : 'none'
    }


    //fetching the data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/event`)
                setEventData(res.data)
                // console.log(res.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    //delete functionality
    const deleteEvent = async (id) => {
        //delete from ui
        const filterEvent = eventData.filter(item => item._id !== id)

        setEventData(filterEvent)

        //delete from data base
        try {
            const res = await axios.delete(`/event/${id}`)
            setMessageCond(true)
            setMessage(res.data.msg)
            setTimeout(() => {
                setMessage('')
                setMessageCond(false)
            }, 2000)
        } catch (error) {

        }

    }

    return (
        <div className="same-component">
            <div className="same-form">
                <form onSubmit={handleSubmit}>
                    <h4> Event Event component </h4>

                    <label htmlFor="text">id</label>
                    <input type="text"
                        name="product_id"
                        id="product_id"
                        value={event.product_id}
                        onChange={handleChangeInput}
                        required
                    />

                    <label htmlFor="text">title</label>
                    <input type="text"
                        name="title"
                        id="title"
                        value={event.title}
                        onChange={handleChangeInput}
                        required
                    />

                    <label htmlFor="text">Date</label>
                    <input type="text"
                        name="date"
                        id="date"
                        value={event.date}
                        onChange={handleChangeInput}
                        required
                    />

                    <label htmlFor="text">Description</label>
                    <textarea name="description"
                        id="description"
                        value={event.description}
                        onChange={handleChangeInput}
                        required
                        cols="30"
                        rows="3"
                    />

                    <label htmlFor="text">Location</label>
                    <input type="text"
                        name="location"
                        id="location"
                        value={event.location}
                        onChange={handleChangeInput}
                        required
                    />

                    <label htmlFor="text">upcoming</label>
                    <input type="text"
                        name="upcoming"
                        id="upcoming"
                        value={event.upcoming}
                        onChange={handleChangeInput}
                        required
                    />

                    <div className="upload">
                        <input
                            type="file"
                            name='file'
                            id="file_up"
                            onChange={handleUpload}
                            required
                        />
                        <div id="file_img" className="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />

                            <span onClick={handleDestroy}><p>X</p></span>
                        </div>

                    </div>

                    <button  >Add item</button>
                </form>

            </div>
            <div className="same-item">
                <div className="about-info">
                    {eventData.map((item) => (
                        <div className="events-admin" key={item._id}>
                            <div className="icons">
                                <Link to={`/editEvent/${item._id}`}><i className="fas fa-edit"></i></Link>
                                <i className="fas fa-trash" onClick={() => deleteEvent(item._id)}></i>
                            </div>

                            <div className="single-event">
                                <div className="single-event-img">
                                    <img src={item.images.url} alt="" />
                                </div>
                                <div className="single-event-info">
                                    <h3>title:{item.title}</h3>
                                    <p>description:{item.description}</p>
                                    <i>date:{item.date}</i><br />
                                    <i>location:{item.location}</i><br />
                                    <i>upcoming:{JSON.stringify(item.upcoming)}</i>
                                </div>
                            </div>
                            <h3 className={messageCond ? "new-delete item-delete-tab" : "item-delete-tab"}>{message}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EventsAdmin