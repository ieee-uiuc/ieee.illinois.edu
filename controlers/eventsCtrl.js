const eventSchema = require('../models/eventModel');


exports.getEvent = async (req, res) => {
    try {
        const event = await eventSchema.find(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}

exports.addEvent = async (req, res) => {
    const { title, product_id, date, description, images, location, upcoming } = req.body;

    try {
        const event = new eventSchema({
            title,
            product_id,
            description,
            date,
            images,
            location,
            upcoming
        })
        await event.save();
        res.json({msg:"product added"});
    } catch (error) {
        res.status(500).json({ msg: `server poblems ${error}` })
    }
}

exports.getEventID = async (req, res) => {
    try {
        const event = await eventSchema.findById(req.params.id)
        res.json(event)
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }

}

exports.updateEvent = async (req, res) => {
    const { title, product_id, description, images, location, upcoming } = req.body;

    try {
        const event = await eventSchema.findByIdAndUpdate(req.params.id, {
            title,
            product_id,
            description,
            date,
            images,
            location,
            upcoming
        });

        let results = event.save()
        await results
        res.json({ msg: 'Items Updated' })
    } catch (error) {
        res.status(500).json({ msg: `server problems: ${error}` })
    }
}

exports.delEvent = async (req, res) => {
    try {
        const event = await eventSchema.findByIdAndDelete(req.params.id);

        event;

        res.json({msg:"Item deleted"})
    } catch (error) {
        res.status(500).json({ msg: 'server problems' })
    }
}