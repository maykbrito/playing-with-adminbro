const { Schema, model } = require('mongoose')

const User = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: false,
    },
})

module.exports = model('User', User)