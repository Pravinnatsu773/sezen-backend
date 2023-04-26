const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    { email: { type: String, required: [true, 'must provide a name'], trim: true }, password: { type: String, required: [true, 'must provide a password'], trim: true } })


module.exports = mongoose.model('User', UserSchema)