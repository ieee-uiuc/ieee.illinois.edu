const memberSchema = require("../models/memberModel")

//get all users
exports.getMember = async (req, res) => {
  const member = await memberSchema.find()
  try {
    res.json(member)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//add user
exports.addMember = async (req, res) => {

    const {
      email,
      points
    } = req.body

    try {
      const member = new memberSchema({
        email,
        points,
      })
      console.log(member)
      await member.save()
      res.json({ msg: "member added" })
    } catch (error) {
      console.log(error)

      res.status(500).json({ msg: `server poblems ${error}` })
    }




  // const { member } = req.body
  // console.log(req.body)

  // //first way async await
  // try {
  //   const newMember = new memberSchema({
  //     member: member,
  //   })
  //   await newMember.save()
  //   res.json(newMember)
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({ msg: `server problems: ${error}` })
  // }

  //second way promises
  // const newMember = new memberSchema({
  //     member: member
  // })
  // newMember.save()
  // .then(member=>res.json(`the article was sent`))
  // .catch(err=>res.status(500).json(`error:${err}`))
}

//get user by id
exports.getMemberID = async (req, res) => {
  //first way
  try {
    const member = await memberSchema.findById(req.params.id)
    res.json(member)
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }

  //second way
  // memberSchema.findById(req.params.id)
  // .then(member=>res.json(member))
  // .catch(err=>res.status(400).json({msg:err}))
}

//update user by id
exports.updateMember = async (req, res) => {
  try {
    const { member } = req.body
    const newMember = await memberSchema.findByIdAndUpdate(req.params.id, {
      member,
    })

    let results = newMember.save()
    await results
    res.json({ msg: "Items Updated" })
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}

//delete user by id
exports.delMember = async (req, res) => {
  try {
    const member = await memberSchema.findByIdAndDelete(req.params.id)

    member

    res.json({ msg: "Item deleted" })
  } catch (error) {
    res.status(500).json({ msg: "server problems" })
  }
}
