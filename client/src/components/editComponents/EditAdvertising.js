import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Edit.scss"
import axios from "axios"
import { AdminClickHandler } from "../homepages/functions/AdminHandler"

const initialState = {
  product_id: "",
  title: "",
  description: "",
  date: "",
  link: "",
  linkName: "",
}

const EditAdvertising = (props) => {
  const [advertising, setAdvertisings] = useState(initialState)
  const [images, setImages] = useState(false)
  const [message, setMessage] = useState("")
  const [prev, setPrev] = useState("")
  const history = useHistory()
  const { id } = useParams()

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

  //handle change input
  const handleChangeInput = (e) => {
    const { name, value } = e.target

    setAdvertisings({ ...advertising, [name]: value })
  }

  //getting data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/advertising/${id}`)
        setAdvertisings({
          product_id: res.data.product_id,
          date: res.data.date,
          title: res.data.title,
          description: res.data.description,
          link: res.data.link,
          linkName: res.data.linkName,
        })
        setPrev(res.data.images)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let data = {}
      images
        ? (data = {
            ...advertising,
            images,
          })
        : (data = {
            ...advertising,
            images: prev,
          })
      const res = await axios.put(`/advertising/update/${id}`, data)
      setMessage(res.data.msg)

      setImages(false)
      AdminClickHandler("updated", "Advertising")
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      history.push("/admin")
    }, 2000)
  }

  const styleUpload = {
    display: images ? "block" : "none",
  }

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={handleSubmit}>
              <h3 className="updated">{message}</h3>
              <h4>Advertising components</h4>
              <label htmlFor="text">Id</label>
              <input
                type="text"
                name="product_id"
                required
                id="product_id"
                value={advertising.product_id}
                onChange={handleChangeInput}
              />

              <label htmlFor="text">title</label>
              <input
                type="text"
                name="title"
                required
                value={advertising.title}
                onChange={handleChangeInput}
                id="title"
              />
              <label htmlFor="text">date</label>
              <input
                type="text"
                name="date"
                required
                value={advertising.date}
                onChange={handleChangeInput}
                id="date"
              />

              <label htmlFor="text">Description</label>
              <textarea
                type="text"
                name="description"
                value={advertising.description}
                onChange={handleChangeInput}
                required
                id="description"
                cols="30"
                rows="3"
              />

              <label htmlFor="text">link</label>
              <input
                type="text"
                name="link"
                required
                value={advertising.link}
                onChange={handleChangeInput}
                id="link"
              />

              <label htmlFor="text">linkName</label>
              <input
                type="text"
                name="linkName"
                required
                value={advertising.linkName}
                onChange={handleChangeInput}
                id="linkName"
              />

              <div className="upload">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUpload}
                  required
                />
                <div id="file_img" className="file_img">
                  <img src={images ? images.url : prev.url} alt="" />
                  <span onClick={handleDestroy} style={styleUpload}>
                    <p>X</p>
                  </span>
                </div>
              </div>
              <div className="btns">
                <button>Update item</button>
                <Link to="/admin">
                  <button className="cancel-btn">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAdvertising
