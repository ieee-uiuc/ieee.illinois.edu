import React, { useState, useEffect } from "react"
import "./Register.scss"
import { DataContext } from "../../Context/GlobalContext"
import { ClickHandler } from "../functions/ClickHandler"
import { Link } from "react-router-dom"
import axios from "axios"
import { AdminClickHandler } from "../functions/AdminHandler"

const initialState = {
  email: '',
  points: '0',
}

const Register = () => {
  const [member, setMember] = useState(initialState)
  const [memberData, setMemberData] = useState([])
  const [message, setMessage] = useState("")
  const [messageCond, setMessageCond] = useState(false)

  const fetchData = async () => {
    try {
      const res = await axios.get(`/fetchmember`)
      // console.log(res.data)
      setMemberData(res.data)
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onChangeMember = (e) => {
    const { name, value } = e.target

    setMember({ ...member, [name]: value })
    console.log(member)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log('clicked')
    try {
      console.log({ ...member })
      const res = await axios.post(`/fetchmember`, { ...member })
      setMessage(res.data.msg)
      AdminClickHandler("added", "member")
      setTimeout(() => {
        setMessage("")
      }, 2000)
      setMember("")
      // setMemberData([...memberData,{member}])
    } catch (error) {
      //console.log(error)
    }
  }

  const deleteMember = async (id) => {
    try {
      const res = await axios.delete(`/fetchmember/${id}`)
      setMessageCond(true)
      setMessage(`${res.data.msg}`)
      AdminClickHandler("deleted", "member")
      setTimeout(() => {
        setMessageCond(false)
        setMessage("")
      }, 2000)
    } catch (error) {
      console.log(error)
    }

    //delete from ui
    const memberFilterDel = memberData.filter((item) => item._id !== id)

    setMemberData(memberFilterDel)
  }

  return (
    <div className="names">
      <div className="same-component">
        <div className="same-form">
          <form onSubmit={handleSubmit}>
            <h4>Member Component</h4>
            <label htmlFor="email">Member</label>
            <input
              type="text"
              value={member.email}
              onChange={onChangeMember}
              name="email"
              cols="30"
              row="3"
            />
            <button type="submit">add item</button>
          </form>
        </div>

        <div className="same-item">
          {memberData.map((item) => (
            <div className="member-info" key={item._id}>
              <div className="icons">
                <Link to={`/editMember/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i
                  className="fas fa-trash"
                  onClick={() => deleteMember(item._id)}
                ></i>
              </div>
              <p>{item.email}</p>
            </div>
          ))}
          <h3
            className={
              messageCond ? "new-delete item-delete-tab" : "item-delete-tab"
            }
          >
            {message}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Register
