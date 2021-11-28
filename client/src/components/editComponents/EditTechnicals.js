import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Edit.scss'
import axios from 'axios'

const initialState = {
    product_id: '',
    title: '',
    description: '',
    date: ''
}

const EditTechnical = (props) => {

    const [technical, setTechnicals] = useState(initialState)
    const [images, setImages] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()

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

    //handle change input
    const handleChangeInput = (e) => {

        const { name, value } = e.target

        setTechnicals({ ...technical, [name]: value })
    }

    //getting data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/technical/${props.match.params.id}`)
                setTechnicals({
                    product_id: res.data.product_id,
                    date: res.data.date,
                    title: res.data.title,
                    description: res.data.description
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    //submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/technical/update/${props.match.params.id}`, { ...technical, images })
            setMessage(res.data.msg)

            setImages(false)
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            history.push('/admin')
        }, 5000)
    }

    const styleUpload = {
        display: images ? 'block' : 'none'
    }

    return (
        <div className="edit">
            <div className="main-container">
                <div className="same-component">
                    <div className="same-form">
                        <form onSubmit={handleSubmit}>
                            <h3 className="updated">{message}</h3>
                            <h4>Technical components</h4>
                            <label htmlFor="text">Id</label>
                            <input
                                type="text"
                                name="product_id"
                                required id="product_id"
                                value={technical.product_id}
                                onChange={handleChangeInput}
                            />

                            <label htmlFor="text">title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={technical.title}
                                onChange={handleChangeInput}
                                id="title" />
                            <label htmlFor="text">date</label>
                            <input
                                type="text"
                                name="date"
                                required
                                value={technical.date}
                                onChange={handleChangeInput}
                                id="date" />

                            <label htmlFor="text">Description</label>
                            <textarea type="text"
                                name="description"
                                value={technical.description}
                                onChange={handleChangeInput}
                                required id="description" cols="30" rows="3" />

                            <div className="upload" >
                                <input type="file"
                                    name="file"
                                    id="file_up"
                                    onChange={handleUpload}
                                    required
                                />
                                <div id="file_img" className="file_img" style={styleUpload}>
                                    <img src={images ? images.url : ''} alt="" />
                                    <span onClick={handleDestroy}><p>X</p></span>

                                </div>

                            </div>
                            <div className="btns">
                                <button>Update item</button>
                                <Link to="/admin"><button className="cancel-btn">Cancel</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTechnical