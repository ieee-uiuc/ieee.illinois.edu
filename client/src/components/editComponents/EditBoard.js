import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Edit.scss"
import axios from "axios"
import { AdminClickHandler } from "../homepages/functions/AdminHandler"

const initialState = {
  product_id: "",
  title: "",
  description: "",
  name: "",
}

const EditBoard = (props) => {
  const [board, setBoards] = useState(initialState)
  const [prev, setprev] = useState("")
  const [images, setImages] = useState(false)
  const [message, setMessage] = useState("")
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

    setBoards({ ...board, [name]: value })
  }

  //getting data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/fetchboard/${id}`)
        setBoards({
          product_id: res.data.product_id,
          name: res.data.name,
          title: res.data.title,
          description: res.data.description,
        })
          console.log(res.data.images)
          setprev(res.data.images)
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
    //   console.log(prev)
    //   console.log(board.title)
    //     console.log(board.name)
        let data = {}
        images
          ? (data = {
              ...board,
              images,
            })
          : (data = {
              ...board,
              "images" : prev,
            })

    //   console.log(data)
      const res = await axios.put(`/fetchboard/update/${id}`, data)
      setMessage(res.data.msg)

      setImages(false)
      AdminClickHandler("updated", "board")
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      history.push("/admin")
    }, 2000)
  }

  const styleUpload = {
    display: images ? "bl" : "none",
  }

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={handleSubmit}>
              <h3 className="updated">{message}</h3>
              <h4>Board components</h4>
              <label htmlFor="text">Id</label>
              <input
                type="text"
                name="product_id"
                required
                id="product_id"
                value={board.product_id}
                onChange={handleChangeInput}
              />

              <label htmlFor="text">title</label>
              <input
                type="text"
                name="title"
                required
                value={board.title}
                onChange={handleChangeInput}
                id="title"
              />
              <label htmlFor="text">name</label>
              <input
                type="text"
                name="name"
                required
                value={board.name}
                onChange={handleChangeInput}
                id="name"
              />

              <label htmlFor="text">Description</label>
              <textarea
                type="text"
                name="description"
                value={board.description}
                onChange={handleChangeInput}
                required
                id="description"
                cols="30"
                rows="3"
              />

              <div className="upload">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUpload}
                />
                <div id="file_img" className="file_img">
                  <img src={images ? images.url : prev.url} alt="" />

                  {images ? (
                    <span onClick={handleDestroy}>
                      <p>X</p>
                    </span>
                  ) : (
                    <div />
                  )}
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

export default EditBoard
