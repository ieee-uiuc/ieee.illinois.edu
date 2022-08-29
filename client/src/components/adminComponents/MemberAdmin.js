import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AdminClickHandler } from "../homepages/functions/AdminHandler"

const initialState = {
  email: "",
  points: 0,
}

const MembersAdmin = () => {
  const [member, setMember] = useState(initialState)
  const [message, setMessage] = useState("")
  const [messageCond, setMessageCond] = useState(false)
  const [memberData, setMemberData] = useState([])

  //handle change
  const handleChangeInput = (e) => {
    const { name, value } = e.target

    setMember({ ...member, [name]: value })

    // console.log(product.description)
    // console.log(product.title)
    // console.log(member.date)
  }

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(member.upcoming)
    try {
      const res = await axios.post("fetchmember", { ...member })
      // console.log({...member})
      setMessage(res.data.msg)
      setTimeout(() => {
        setMessage("")
      }, 2000)
      setMember(initialState)
      AdminClickHandler("added", "Member")
    } catch (error) {
      console.log(error)
    }
  }

  //fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/fetchmember`)
        setMemberData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()

    var Memberdict = {}
    for (var memb in memberData) {
      Memberdict[memberData[memb].email] = { points: memberData[memb].points }
      console.log(Memberdict)
    }
  }, [])

  //delete functionality
  const deleteMember = async (id) => {
    //delete from ui
    const filterMember = memberData.filter((item) => item._id !== id)

    setMemberData(filterMember)

    //delete from data base
    try {
      const res = await axios.delete(`fetchmember/${id}`)
      setMessageCond(true)
      setMessage(res.data.msg)
      setTimeout(() => {
        setMessage("")
        setMessageCond(false)
      }, 2000)
      AdminClickHandler("deleted", "Member")
    } catch (error) {}
  }

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4> Member component </h4>

          <label htmlFor="text">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={member.email}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="text">points</label>
          <input
            type="text"
            name="points"
            id="points"
            value={member.points}
            onChange={handleChangeInput}
            required
          />

          <button>Add item</button>
        </form>
      </div>
      <div className="same-item">
        <div className="about-info">
          {memberData.map((item) => (
            <div className="contents-admin" key={item._id}>
              <div className="icons">
                <Link to={`/editmember/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i
                  className="fas fa-trash"
                  onClick={() => deleteMember(item._id)}
                ></i>
              </div>

              <div className="single-content">
                <div className="single-content-info">
                  <h3><i style={{fontWeight:"300"}}>{item.email}</i></h3>
                  {/* <h3>points: <i style={{fontWeight:"300"}}>{item.points}</i></h3> */}
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

export default MembersAdmin
