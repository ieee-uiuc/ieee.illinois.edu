const technicalSchema = require('../models/technicalModel');


exports.getTechnical = async (req, res) => {
    try {
        const technical = await technicalSchema.find(req.body);
        res.json(technical);
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

exports.addTechnical = async (req, res) => {
    const { title, product_id, date, description, images } = req.body;

    try {
        const technical = new technicalSchema({
            title, 
            product_id, 
            description, 
            date,
            images
        })
        await technical.save();
        res.json({msg:"product added"});
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

exports.getTechnicalID = async (req, res) => {
    try {
        const technical = await technicalSchema.findById(req.params.id)
        res.json(technical)
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }

}

exports.updateTechnical = async (req, res) => {
    const { title, product_id, description, images } = req.body;

    try {
        const technical = await technicalSchema.findByIdAndUpdate(req.params.id, {
            title, 
            product_id, 
            description,
            date, 
            images
        });

        let results = technical.save()
        await results
        res.json({ msg: 'Items Updated' })
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

exports.delTechnical = async (req, res) => {
    try {
        const technical = await technicalSchema.findByIdAndDelete(req.params.id);

        technical;
    
        res.json({msg:"Item deleted"})
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}