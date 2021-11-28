const router = require('express').Router();
const {getSocial, getSocialID, updateSocial, addSocial, delSocial} = require('../controlers/socialCtrl');

//get social
router.get('/social', getSocial)

//add social 
router.post('/social', addSocial)

//get social by id
router.get('/social/:id', getSocialID)

//update social by id
router.put('/social/update/:id', updateSocial)

//delete social by id
router.delete('/social/:id', delSocial)


module.exports = router;