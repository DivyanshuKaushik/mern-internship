const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
})

const Data = mongoose.model("data",dataSchema);

module.exports = Data