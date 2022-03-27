const mongoose = require("mongoose")
const moment = require("moment")
const Twilio = require("twilio")

require("dotenv").config()

const appointmentSchema = new mongoose.Schema({
  name: String,
  event: String,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
  time: Date,
})

appointmentSchema.methods.requiresNotification = function (date) {
  console.log(
    Math.round(
      moment
        .duration(
          moment(this.time).tz(this.timeZone).utc().diff(moment(date).utc())
        )
        .asMinutes()
    )
  )
  return (
    Math.round(
      moment
        .duration(
          moment(this.time).tz(this.timeZone).utc().diff(moment(date).utc())
        )
        .asMinutes()
    ) === this.notification
  )
}

appointmentSchema.statics.sendNotifications = function (callback) {
  // now
  const searchDate = new Date()
  Appointment.find().then(function (appointments) {
    console.log(appointments, searchDate)
    appointments = appointments.filter(function (appointment) {
      return appointment.requiresNotification(searchDate)
    })
    console.log(appointments)
    if (appointments.length > 0) {
      sendNotifications(appointments)
    }
  })

  /**
   * Send messages to all appoinment owners via Twilio
   * @param {array} appointments List of appointments.
   */
  function sendNotifications(appointments) {
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
    appointments.forEach(function (appointment) {
      // Create options to send the message
      const options = {
        to: `+ ${appointment.phoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        /* eslint-disable max-len */
        body: `Hi ${appointment.name}. Just a reminder that you have ${appointment.event} in 1 hour.`,
        /* eslint-enable max-len */
      }

      // Send the message!
      client.messages.create(options, function (err, response) {
        if (err) {
          // Just log it for now
          console.error(err)
        } else {
          // Log the last few digits of a phone number
          let masked = appointment.phoneNumber.substr(
            0,
            appointment.phoneNumber.length - 5
          )
          masked += "*****"
          console.log(`Message sent to ${masked}`)
        }
      })
    })

    // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery
    if (callback) {
      callback.call()
    }
  }
}

const Appointment = mongoose.model("appointment", appointmentSchema)
module.exports = Appointment