import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from "react-router-dom"
import './Edit.scss'
import axios from 'axios'
import { AdminClickHandler } from '../homepages/functions/AdminHandler'

const EditAbout = (props) => {

    const [about, setAbout] = useState('')
    const [message, setMessage] = useState('')
    const history = useHistory()
    const { id } = useParams()

    //get id



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/fetchabout/${id}`)
                // console.log(res.data)
                setAbout(res.data.about)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const onChangeAbout = (e) => {
        setAbout(e.target.value)
        // console.log(about)
    }

    const updateAbout = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/fetchabout/update/${props.match.params.id}`, { about })
            setMessage(`${res.data.msg}`)
            AdminClickHandler("updated", "about")
        } catch (error) {
            console.log(error)
        }
        // setAbout('')
        setTimeout(() => {
            history.push("/admin")
        }, 2000)
    }

    return (
        <div className="edit">
            <div className="main-container">
                <div className="same-component">
                    <div className="same-form">
                        <form>
                            <h3 className="updated">{message}</h3>
                            <label htmlfor="text">About</label>
                            <textarea
                                value={about}
                                onChange={onChangeAbout}
                                name="textatea"
                                id=""
                                cols="30"
                                rows="6" />
                            <div className="btns">
                                <button type="submit" onClick={updateAbout}>Update</button>
                                <Link to="/admin"><button className="cancel-btn">cancel</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAbout