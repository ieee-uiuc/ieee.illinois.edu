const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('board', boardSchema);