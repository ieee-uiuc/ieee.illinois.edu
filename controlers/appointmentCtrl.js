const Appointment = require("../models/appointment")
//get all users
exports.getAppointment = async (req, res) => {
  const appointment = await Appointment.find()
  try {
    res.json(appointment)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//add user
exports.addAppointment = async (req, res) => {
  const { appointment } = req.body

  //async await
  try {
    const newAppointment = new Appointment({
      appointment: appointment,
    })
    await newAppointment.save()
    res.json(newAppointment)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//get user by id
exports.getAppointmentID = async (req, res) => {
  //first way
  try {
    const appointment = await Appointment.findById(req.params.id)
    res.json(appointment)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//update user by id
exports.updateAppointment = async (req, res) => {
  try {
    const { appointment } = req.body
    const newAppointment = await Appointment.findByIdAndUpdate(req.params.id, {
      appointment,
    })

    let results = newAppointment.save()
    await results
    res.json({ msg: "Items Updated" })
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//delete user by id
exports.delAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)

    appointment

    res.json({ msg: "Item deleted" })
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}
