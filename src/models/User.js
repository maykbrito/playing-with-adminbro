const { model } = require('mongoose')

const User = {
    email: {
      type: String,
      required: true,
    },
    name: String
}

module.exports = model('User', User)