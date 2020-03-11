import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const phoneNumberSchema = new Schema({
    _id : Number,
    name :  String,
    phoneNumber : Number
})

const phoneNumber = model("phoneNumber", phoneNumberSchema)
export default phoneNumber



