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
      var re = /^(1|)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
      console.log(re.test(input_str))
      return re.test(input_str)
    }

    function formatPhoneNumber(phoneNumberString) {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "")
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = match[1] ? (+1|1|+1 |1 ) : "1"
        return [intlCode, match[2], match[3], match[4]].join("")
      }
      return null
    }

    function convertTZ(date, tzString) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
        )
      )
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
            notification: 60,
            timeZone: "America/Chicago",
            time: convertTZ(this.props.date, "America/Chicago"),
          }
          const res = await axios.post(`/appointment`, appointmentArray)
          this.setState({ appointment: "", message: "sucsess!" })
          alert(
            `Sucsessfully registered for SMS notification for phone number: ${res.data.phoneNumber} for event: ${res.data.event}`
          )
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
            <i>{this.props.date.toLocaleString()}</i>
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
              <h2 className="card__phone__title">
                <i>SMS reminder 1 hour before event</i>
              </h2>
              <div className="card__phone__form">
                <label
                  className="card__phone__form__text"
                  htmlFor="phone number"
                >
                  Phone Number:
                </label>
                <input
                  className="card__phone__form__input"
                  type="text"
                  placeholder="1234567890"
                  value={this.state.appointment}
                  onChange={onChangeAppointment}
                  cols="30"
                  row="1"
                />
                <button className="card__phone__form__submit" type="submit">
                  send notification
                </button>
              </div>
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
