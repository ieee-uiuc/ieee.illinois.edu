const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
})

module.exports = mongoose.model("member", memberSchema)
