const router = require("express").Router()
const {
  getAdvertising,
  getAdvertisingID,
  updateAdvertising,
  addAdvertising,
  delAdvertising,
} = require("../controlers/advertisingCtrl")

//get advertising
router.get("/advertising", getAdvertising)

//add advertising
router.post("/advertising", addAdvertising)

//get advertising by id
router.get("/advertising/:id", getAdvertisingID)

//update advertising by id
router.put("/advertising/update/:id", updateAdvertising)

//delete advertising by id
router.delete("/advertising/:id", delAdvertising)

module.exports = router
