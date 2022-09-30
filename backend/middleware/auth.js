const userModel = require('../model/userModel')
const SECRETKEY = 'MYNAMEISASHISHAGRAWAL'
const jwt = require('jsonwebtoken')
const verifyEmail = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user.isVerified) {
      res.status(400).json({ error: 'Please Verify Email First' })
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
  }
}

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, SECRETKEY, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' })
      } else {
        req.user = decode
        console.log(req.user)
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}

module.exports = { verifyEmail, isAuth }
