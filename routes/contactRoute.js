const router = require('express').Router()
const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
    res.send('contacted')
})

router.post('/', (req, res) => {

    let data = req.body

    //stmp protocol
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            password: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: data.email,
        to: 'ramvandermeer@gmail.com',
        subject: `Message from ${data.name}`,
        html: `
    <h3>Information</h3>
    <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    `
    }

    smtpTransport.sendMail(mailOptions, (err, response) => {
        try {
            if (err) return res.status(400).json({ msg: err })
            else {
                return res.status(200), json({ msg: `Message was sent` })
            }
        } catch (err) {
            res.status(500).json({ msg: err })
        }
    })
})



module.exports = router