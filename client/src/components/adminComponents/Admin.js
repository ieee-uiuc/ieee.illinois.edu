import React, { useEffect } from "react"
import "./Admin.scss"
import AboutAdmin from "./AboutAdmin"
import AdvertisingAdmin from "./AdvertisingAdmin"
import BoardAdmin from "./BoardAdmin"
import EventsAdmin from "./EventsAdmin"
import { UserLogin } from "../homepages/functions/AdminHandler"
import MembersAdmin from "./MemberAdmin"

const Admin = () => {
  useEffect(() => {
    UserLogin()
  }, [])

  return (
    <div>
      <div className="main-container">
        <h2 className="title">Admin forms:</h2>
        <div className="admin-center">
          <h4 className="admin-title">About Component</h4>
          <AboutAdmin />

          <br />
          <br />
          <hr className="lightgray-broder"></hr>
          <br />

          <h4 className="admin-title">Advertising Component</h4>
          <AdvertisingAdmin />

          <br />
          <br />
          <hr className="lightgray-broder"></hr>
          <br />

          <h4 className="admin-title">Events Component</h4>
          <EventsAdmin />

          <br />
          <br />
          <hr className="lightgray-broder"></hr>
          <br />

          <h4 className="admin-title">Board Component</h4>
          <BoardAdmin />

          <br />
          <br />
          <hr className="lightgray-broder"></hr>
          <br />

          <h4 className="admin-title">Member Component</h4>
          <MembersAdmin />

          <br />
        </div>
      </div>
    </div>
  )
}

export default Admin
