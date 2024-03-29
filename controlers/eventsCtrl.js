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
    const { title, product_id, date, description, location, upcoming, code, link, linkName, images } = req.body;

    try {
        const event = new eventSchema({
            title,
            product_id,
            description,
            date,
            location,
            upcoming,
            code,
            link,
            linkName,
            images
        })
        await event.save();
        res.json({msg:"event added"});
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
    const { title, product_id, description, date, images, location, upcoming, code, link, linkName } = req.body;

    try {
        const event = await eventSchema.findByIdAndUpdate(req.params.id, {
            title,
            product_id,
            description,
            date,
            images,
            location,
            link,
            linkName,
            upcoming,
            code
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