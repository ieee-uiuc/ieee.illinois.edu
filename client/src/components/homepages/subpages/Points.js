import React, { useState, useEffect } from "react"
import "./Points.scss"
import { Link } from "react-router-dom"
import axios from "axios"
import { AdminClickHandler } from "../functions/AdminHandler"

const initialState = {
  email: "",
  points: "0",
}

const Points = () => {
  const [member, setMember] = useState(initialState)
  const [memberData, setMemberData] = useState([])
  const [message, setMessage] = useState("")
  const [messageCond, setMessageCond] = useState(false)
  let memberDictionary = {}

  const fetchData = async () => {
    try {
      const res = await axios.get(`/fetchmember`)
      // console.log(res.data)
      setMemberData(res.data)
      // console.log(memberData)
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

  function ValidateEmail(mail) {
    if (/^\w+([-+.']\w+)*@?(illinois.edu)$/.test(mail)) {
      return true
    }
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log('clicked')

    if (ValidateEmail(member.email)) {
      try {
        for (var memb in memberData) {
          memberDictionary[memberData[memb].email] = {
            points: memberData[memb].points,
          }
        }

        if (memberDictionary[member.email]) {
          setMessage(`point total: ${memberDictionary[member.email].points}`)
        } else {
          setMessage(`no member with email: ${member.email}`)
        }
        AdminClickHandler("added", "member")
        setTimeout(() => {
          setMessage("")
        }, 2000)
        setMember(initialState)
        // setMemberData([...memberData,{member}])
      } catch (error) {
        //console.log(error)
      }
    } else {
      setTimeout(() => {
        setMessage("Invalid email adress")
      }, 2000)
    }
  }

  return (
    <div className="wrapper">
      <div className="wrapper__flex">
        <form className="wrapper__flex__form" onSubmit={handleSubmit}>
          <h3 className="wrapper__flex__text align-center">
            View your point total
          </h3>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            placeholder="example@illinois.edu"
            type="text"
            value={member.email}
            onChange={onChangeMember}
            name="email"
            cols="30"
            row="3"
          />
          <button type="submit">View Points</button>
        </form>
        <div className="wrapper__flex__added">
          {/* {memberData.map((item) => (
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
          ))} */}
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

export default Points
