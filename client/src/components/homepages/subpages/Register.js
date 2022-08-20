import React, { useContext } from "react"
import "./Register.scss"
import { DataContext } from "../../Context/GlobalContext"
import { ClickHandler } from "../functions/ClickHandler"

const Register = () => {
  const state = useContext(DataContext)
  const [member] = state.member
  const [dataMember] = state.dataMember
  return (
    <div className="names">
          <p>{member.map((item) => item.email)}</p>
          <p>test</p>

          
    </div>
  )
}

export default Register
