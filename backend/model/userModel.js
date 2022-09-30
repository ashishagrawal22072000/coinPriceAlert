const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

userSchema.pre('save', async function (next) {
  // console.log("hi from user");
  if (this.isModified('password')) {
    this.password = await bcrypt.hashSync(this.password, 10)
  }
  next()
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
