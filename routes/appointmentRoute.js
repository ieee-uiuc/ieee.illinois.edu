const router = require("express").Router()
const {
  getAppointment,
  getAppointmentID,
  updateAppointment,
  addAppointment,
  delAppointment,
} = require("../controlers/appointmentCtrl")

//get events
router.get("/appointment", getAppointment)

//add Appointment
router.post("/appointment", addAppointment)

//get Appointment by id
router.get("/appointment/:id", getAppointmentID)

//update Appointment by id
router.put("/appointment/update/:id", updateAppointment)

//delete Appointment by id
router.delete("/appointment/:id",  delAppointment)

module.exports = router
