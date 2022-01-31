const advertisingSchema = require("../models/advertisingModel")

//get all users
exports.getAdvertising = async (req, res) => {
  const advertising = await advertisingSchema.find()
  try {
    res.json(advertising)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//add user
exports.addAdvertising = async (req, res) => {
  const { title, product_id, date, description, images } = req.body

  //first way async await
  try {
    const newAdvertising = new advertisingSchema({
      title,
      product_id,
      date,
      description,
      images,
    })
    await newAdvertising.save()
    res.json(newAdvertising)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
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
exports.getAdvertisingID = async (req, res) => {
  //first way
  try {
    const advertising = await advertisingSchema.findById(req.params.id)
    res.json(advertising)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }

  //second way
  // aboutSchema.findById(req.params.id)
  // .then(about=>res.json(about))
  // .catch(err=>res.status(400).json({msg:err}))
}

//update user by id
exports.updateAdvertising = async (req, res) => {
  try {
    const { title, product_id, date, description, images } = req.body
    const newAdvertising = await advertisingSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        product_id,
        date,
        description,
        images,
      }
    )

    let results = newAdvertising.save()
    await results
    res.json({ msg: "Items Updated" })
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//delete user by id
exports.delAdvertising = async (req, res) => {
  try {
    const advertising = await advertisingSchema.findByIdAndDelete(req.params.id)

    advertising

    res.json({ msg: "Item deleted" })
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}
