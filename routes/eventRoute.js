const router = require('express').Router();
const {getEvent, getEventID, updateEvent, addEvent, delEvent} = require('../controlers/eventsCtrl');


//get events
router.get('/event', getEvent)

//add event
router.post('/event', addEvent)

//get event by id
router.get('/event/:id', getEventID)

//update event by id
router.put('/event/update/:id', updateEvent)

//delete event by id
router.delete('/event/:id', delEvent)


module.exports = router;