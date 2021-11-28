const router = require('express').Router();
const {getBoard, getBoardID, updateBoard, addBoard, delBoard} = require('../controlers/boardCtrl');

//get board
router.get('/fetchboard', getBoard)

//add board 
router.post('/fetchboard', addBoard)

//get board by id
router.get('/fetchboard/:id', getBoardID)

//update board by id
router.put('/fetchboard/update/:id', updateBoard)

//delete board by id
router.delete('/fetchboard/:id', delBoard)


module.exports = router;