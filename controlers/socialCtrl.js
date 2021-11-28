const socialSchema = require('../models/socialModel');


//get all users
exports.getSocial = async (req, res) => {
    const social = await socialSchema.find();
    try {
        res.json(social);
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

//add user
exports.addSocial = async (req, res) => {
    const { title, product_id, date, description, images } = req.body;

    //first way async await
    try {
        const newSocial = new socialSchema({
            title, 
            product_id, 
            date, 
            description, 
            images
        })
        await newSocial.save();
        res.json(newSocial);
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
exports.getSocialID = async (req, res) => {
    //first way
    try {
        const social = await socialSchema.findById(req.params.id)
        res.json(social)
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }

    //second way
    // aboutSchema.findById(req.params.id)
    // .then(about=>res.json(about))
    // .catch(err=>res.status(400).json({msg:err}))
}


//update user by id
exports.updateSocial = async (req, res) => {
    try {
        const { title, product_id, date, description, images } = req.body;
        const newSocial = await socialSchema.findByIdAndUpdate(req.params.id, {
            title, 
            product_id, 
            date, 
            description, 
            images
        });

        let results = newSocial.save()
        await results
        res.json({ msg: 'Items Updated' })
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}


//delete user by id
exports.delSocial = async (req, res) => {
    try {
        const social = await socialSchema.findByIdAndDelete(req.params.id);

        social;
    
        res.json({msg:"Item deleted"})
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}