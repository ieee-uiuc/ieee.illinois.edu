const boardSchema = require('../models/boardModel');


//get all users
exports.getBoard = async (req, res) => {
    const board = await boardSchema.find();
    try {
        res.json(board);
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

//add user
exports.addBoard = async (req, res) => {
    const { title, product_id, name, description, images } = req.body;

    //first way async await
    try {
        const newBoard = new boardSchema({
            title, 
            product_id, 
            name, 
            description, 
            images
        })
        await newBoard.save();
        res.json(newBoard);
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }

    //second way promises
    // const newAbout = new aboutSchema({
    //     about: about
    // })
    // newAbout.save()
    // .then(about=>res.json(`the article was sent`))
    // .catch(err=>res.status(500).json(`error:${err}`))

}


//get user by id
exports.getBoardID = async (req, res) => {
    //first way
    try {
        const board = await boardSchema.findById(req.params.id)
        res.json(board)
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }

    //second way
    // aboutSchema.findById(req.params.id)
    // .then(about=>res.json(about))
    // .catch(err=>res.status(400).json({msg:err}))
}


//update user by id
exports.updateBoard = async (req, res) => {
    try {
        const { title, product_id, name, description, images } = req.body;
        const newBoard = await boardSchema.findByIdAndUpdate(req.params.id, {
            title, 
            product_id, 
            name, 
            description, 
            images
        });

        let results = newBoard.save()
        await results
        res.json({ msg: 'Items Updated' })
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}


//delete user by id
exports.delBoard = async (req, res) => {
    try {
        const board = await boardSchema.findByIdAndDelete(req.params.id);

        board;
    
        res.json({msg:"Item deleted"})
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}