const router = require('express').Router();
const {getTechnical, getTechnicalID, updateTechnical, addTechnical, delTechnical} = require('../controlers/technicalsCtrl');


//get technicals
router.get('/technical', getTechnical)

//add technical 
router.post('/technical', addTechnical)

//get technical by id
router.get('/technical/:id', getTechnicalID)

//update technical by id
router.put('/technical/update/:id', updateTechnical)

//delete technical by id
router.delete('/technical/:id', delTechnical)


module.exports = router;