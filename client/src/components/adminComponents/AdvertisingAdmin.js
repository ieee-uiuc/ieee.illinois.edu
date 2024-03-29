import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AdminClickHandler } from "../homepages/functions/AdminHandler"

const initialState = {
  product_id: "",
  title: "",
  description: "",
  images: "",
  date: "",
  link: "",
  linkName:"",
}

const AdvertisingsAdmin = () => {
  const [advertising, setAdvertising] = useState(initialState)
  const [images, setImages] = useState(false)
  const [message, setMessage] = useState("")
  const [messageCond, setMessageCond] = useState(false)
  const [advertisingData, setAdvertisingData] = useState([])

  //upload
  const handleUpload = async (e) => {
    e.preventDefault()

    try {
      const file = e.target.files[0]
      if (!file) return alert("no files exist")

      if (file.size > 4096 * 2048) {
        return alert("size is too big")
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("incorrect file format")
      }

      let formData = new FormData()
      formData.append("file", file)

      const res = await axios.post("/upload", formData, {
        headers: { "content-type": "multipart/form-data" },
      })

      setImages(res.data)
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

  //delete
  const handleDestroy = async () => {
    try {
      await axios.post("/destroy", { public_id: images.public_id })
      setImages(false)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  //handle change
  const handleChangeInput = (e) => {
    const { name, value } = e.target

    setAdvertising({ ...advertising, [name]: value })
    // console.log(product.description)
    // console.log(product.title)
    // console.log(product.product_id)
  }

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/advertising", { ...advertising, images })
      setMessage(res.data.msg)
      AdminClickHandler("added", "Advertising")
      setTimeout(() => {
        setMessage("")
      }, 2000)
      setAdvertising(initialState)
      setImages(false)
    } catch (error) {
      console.log(error)
    }
  }

  const styleUpload = {
    display: images ? "block" : "none",
  }

  //fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/advertising`)
        setAdvertisingData(res.data)
        // console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  //delete functionality
  const deleteAdvertising = async (id) => {
    //delete from ui
    const filterAdvertising = advertisingData.filter((item) => item._id !== id)

    setAdvertisingData(filterAdvertising)

    //delete from data base
    try {
      const res = await axios.delete(`/advertising/${id}`)
      setMessageCond(true)
      setMessage(res.data.msg)
      AdminClickHandler("deleted", "Advertising")
      setTimeout(() => {
        setMessage("")
        setMessageCond(false)
      }, 2000)
    } catch (error) {}
  }

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4> Advertising Event component </h4>

          <label htmlFor="text">id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            value={advertising.product_id}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="text">title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={advertising.title}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="text">Date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={advertising.date}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="text">Description</label>
          <textarea
            name="description"
            id="description"
            value={advertising.description}
            onChange={handleChangeInput}
            required
            cols="30"
            rows="3"
          />

          <label htmlFor="text">Link</label>
          <input
            type="text"
            name="link"
            id="link"
            value={advertising.link}
            onChange={handleChangeInput}
            required
          />
          <label htmlFor="text">Link Name</label>
          <input
            type="text"
            name="linkName"
            id="linkName"
            value={advertising.linkName}
            onChange={handleChangeInput}
            required
          />

          <div className="upload">
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={handleUpload}
              required
            />
            <div id="file_img" className="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />

              <span onClick={handleDestroy}>
                <p>X</p>
              </span>
            </div>
          </div>

          <button>Add item</button>
        </form>
      </div>
      <div className="same-item">
        <div className="about-info">
          {advertisingData.map((item) => (
            <div className="contents-admin" key={item._id}>
              <div className="icons">
                <Link to={`/editadvertising/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i
                  className="fas fa-trash"
                  onClick={() => deleteAdvertising(item._id)}
                ></i>
              </div>

              <div className="single-content">
                <div className="single-content-img">
                  <img src={item.images.url} alt="" />
                </div>
                <div className="single-content-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <i>{item.date}</i>
                  <p>{item.link}</p>
                  <p>{item.linkName}</p>
                </div>
              </div>
              <h3
                className={
                  messageCond ? "new-delete item-delete-tab" : "item-delete-tab"
                }
              >
                {message}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdvertisingsAdmin
