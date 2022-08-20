const router = require("express").Router()
const {
  getMember,
  getMemberID,
  updateMember,
  addMember,
  delMember,
} = require("../controlers/memberCtrl")

//get all users
router.get("/fetchmember", getMember)

//add user
router.post("/fetchmember", addMember)

//get user by id
router.get("/fetchmember/:id", getMemberID)

//update user by id
router.put("/fetchmember/update/:id", updateMember)

//delete user by id
router.delete("/fetchmember/:id", delMember)

module.exports = router
