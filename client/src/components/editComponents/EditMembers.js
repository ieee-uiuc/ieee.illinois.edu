import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Edit.scss"
import axios from "axios"
import { AdminClickHandler } from "../homepages/functions/AdminHandler"

const initialState = {
  email: "",
  points: 0,
}

const EditMember = (props) => {
  const [member, setMembers] = useState(initialState)
  const [message, setMessage] = useState("")
  const history = useHistory()

  //handle change input
  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setMembers({ ...member, [name]: value })
  }

  //getting data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/fetchmember/${props.match.params.id}`)
        setMembers({
          email: res.data.email,
          points: res.data.points,
        })
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
          console.log({ ...member })
      const res = await axios.put(
        `/fetchmember/update/${props.match.params.id}`,
        {
          ...member
        }
      )
      setMessage(res.data.msg)
      AdminClickHandler("updated", "members")
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      history.push("/admin")
    }, 1000)
  }

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={handleSubmit}>
              <h3 className="updated">{message}</h3>
                          <h4>Member components</h4>

              <label htmlFor="text">Email</label>
              <input
                type="text"
                name="email"
                required
                id="email"
                value={member.email}
                onChange={handleChangeInput}
              />

              <label htmlFor="text">points</label>
              <input
                type="text"
                name="points"
                required
                value={member.points}
                onChange={handleChangeInput}
                id="points"
              />
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

export default EditMember
