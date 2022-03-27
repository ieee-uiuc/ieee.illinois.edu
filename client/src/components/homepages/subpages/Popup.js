import ReactDOM from "react-dom"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { AdminClickHandler } from "../../homepages/functions/AdminHandler"

export class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointment: "",
      message: {},
    }
  }

  render() {
    const onChangeAppointment = (e) => {
      this.setState({ appointment: e.target.value })
    }

    function validatePhoneNumber(input_str) {
      var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
      console.log(re.test(input_str))
      return re.test(input_str)
    }

    function formatPhoneNumber(phoneNumberString) {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "")
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = match[1] ? "+1 " : ""
        return [intlCode, match[2], match[3], match[4]].join("")
      }
      return null
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log("clicked")
      let appoi = this.state.appointment

      // console.log(appointmentArray)
      if (validatePhoneNumber(appoi)) {
        try {
          appoi = formatPhoneNumber(appoi)
          const appointmentArray = {
            name: "IEEE Member",
            event: this.props.title,
            phoneNumber: appoi,
            notification: 30,
            timeZone: "America/Chicago",
            time: Date(this.props.date),
          }
          const res = await axios.post(`/appointment`, appointmentArray)
          this.setState({ appointment: "", message: "sucsess!" })
          console.log(res.data.msg, "msg")
          AdminClickHandler("added", "appointment")
          setTimeout(() => { this.setState({ message: ''}) }, 2000)
        } catch (error) {
          console.log(error)
        }
      }
      else {
        alert("invalid phone number: please enter in format: (123) 456-7890, (123)456-7890, 123-456-7890 or 1234567890")
      }
    }

    return ReactDOM.createPortal(
      <div className={this.props.isOpen ? "show" : "hidden"}>
        <div className="card">
          <div className="card__title">{this.props.title}</div>
          <div className="card__date">
            <i>{this.props.date}</i>
          </div>
          <div className="card__location">
            <i>{this.props.location}</i>
          </div>
          <div className="card__image">
            <img src={this.props.image} alt={this.props.id} />
          </div>
          <div className="card__description">{this.props.description}</div>
          <div className="card__link-container">
            <Link
              to={{
                pathname: `${this.props.link}`,
              }}
              className="about__link__link"
              target="_blank"
            >
              {this.props.linkName}
            </Link>
          </div>

          <div className="card__phone">
            <form onSubmit={handleSubmit}>
              <h2>
                <i>SMS reminder</i>
              </h2>
              <label htmlFor="phone number">Phone Number</label>
              <input
                type="text"
                value={this.state.appointment}
                onChange={onChangeAppointment}
                cols="30"
                row="1"
              />
              <button type="submit">send notification</button>
            </form>
          </div>

          <button
            onClick={() => {
              this.props.setIsOpen(false)
            }}
            className="card__button"
          >
            x
          </button>
          <img
            src={this.props.image}
            id={this.props.id}
            alt={this.props.id}
            className="card__background"
          />
        </div>
      </div>,
      document.body
    )
  }
}

export default Popup
