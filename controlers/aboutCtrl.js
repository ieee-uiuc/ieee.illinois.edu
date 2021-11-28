const aboutSchema = require('../models/aboutModel');


//get all users
exports.getAbout = async (req, res) => {
    const about = await aboutSchema.find();
    try {
        res.json(about);
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

//add user
exports.addAbout = async (req, res) => {
    const { about } = req.body;

    //first way async await
    try {
        const newAbout = new aboutSchema({
            about: about
        })
        await newAbout.save();
        res.json(newAbout);
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
exports.getAboutID = async (req, res) => {
    //first way
    try {
        const about = await aboutSchema.findById(req.params.id)
        res.json(about)
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }

    //second way
    // aboutSchema.findById(req.params.id)
    // .then(about=>res.json(about))
    // .catch(err=>res.status(400).json({msg:err}))
}


//update user by id
exports.updateAbout = async (req, res) => {
    try {
        const { about } = req.body;
        const newAbout = await aboutSchema.findByIdAndUpdate(req.params.id, {
            about
        });

        let results = newAbout.save()
        await results
        res.json({ msg: 'Items Updated' })
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}


//delete user by id
exports.delAbout = async (req, res) => {
    try {
        const about = await aboutSchema.findByIdAndDelete(req.params.id);

        about;
    
        res.json({msg:"Item deleted"})
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}