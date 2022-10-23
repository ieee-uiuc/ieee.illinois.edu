import React, { useState, useEffect } from "react"
import axios from "axios"
import { AdminClickHandler } from "../../homepages/functions/AdminHandler"

require("dotenv").config()

const AddPoints = (props) => {
  const [memberData, setMemberData] = useState([])
  const [code, setCode] = useState([])
  const [email, setEmail] = useState([])
  const [message, setMessage] = useState("")
  const [token, setToken] = useState("")
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
    if (props.code) {
      setToken(props.code)
    } else {
      setToken("ieee")
    }
  }, [])

  for (var memb in memberData) {
    memberDictionary[memberData[memb].email] = {
      points: memberData[memb].points,
      id: memberData[memb]._id,
    }
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    // console.log(e.target.value)
    // console.log(email)
  }
  const onChangeCode = (e) => {
      setCode(e.target.value)
  }

  const handleSubmitPoints = async (e) => {
    e.preventDefault()
    try {
      if (code === token) {
        const member = memberDictionary[email]
        const newPoints = {
          email: email,
          points: member.points + 5,
        }
        const res = await axios.put(
          `/fetchmember/update/${member.id}`,
          newPoints
        )
        alert(
          `Sucsessfully added points to user: ${email} for event: ${props.title}`
        )
          AdminClickHandler("added", "points")
          setEmail("")
          setCode("")
      } else {
        alert("invalid code: please enter correct event code")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="card__points">
        <form onSubmit={handleSubmitPoints}>
          <h2 className="card__points__title">
            <i>Get 5 points for attending this event</i>
          </h2>
          <div className="card__points__form">
            <label className="card__form__text" htmlFor="phone number">
              Email:
            </label>
            <input
              className="card__points__form__input"
              type="text"
              placeholder="ueser@illinois.edu"
              value={email}
              onChange={onChangeEmail}
              cols="30"
              row="1"
            />
            <br />
            <label className="card__form__text" htmlFor="code">
              Code:
            </label>
            <input
              className="card__points__form__input"
              type="text"
              placeholder="code"
              value={code}
              onChange={onChangeCode}
              cols="30"
              row="1"
            />
            <br />
            <button className="card__points__form__submit" type="submit">
              add points
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPoints
