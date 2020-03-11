const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phoneNumberSchema = new Schema({
    _id : Number,
    name :  String,
    phoneNumber : Number
})

const phoneNumber = mongoose.model("phoneNumber", phoneNumberSchema)
module.exports = phoneNumber



