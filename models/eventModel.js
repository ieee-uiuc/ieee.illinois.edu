const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({

    product_id:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        trim:true
    },
    date:{
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
    },
    location:{
        type:String,
        required:true
    },
    upcoming:{
        type:Boolean,
        required:true
    }

})

module.exports = mongoose.model('events', eventSchema)