const router = require('express').Router();
const {getAbout, getAboutID, updateAbout, addAbout, delAbout} = require('../controlers/aboutCtrl');

//get all users
router.get('/fetchabout', getAbout)

//add user 
router.post('/fetchabout', addAbout)

//get user by id
router.get('/fetchabout/:id', getAboutID)

//update user by id
router.put('/fetchabout/update/:id', updateAbout)

//delete user by id
router.delete('/fetchabout/:id', delAbout)


module.exports = router;