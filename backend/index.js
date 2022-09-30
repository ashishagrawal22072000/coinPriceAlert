const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 8080
const TrackerModel = require('./model/trackerModel')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const userModel = require('./model/userModel')
const jwt = require('jsonwebtoken')
const { verifyEmail, isAuth } = require('./middleware/auth')
const SECRETKEY = 'MYNAMEISASHISHAGRAWAL'
const EMAIL = 'ashishgarg22072000@gmail.com'
const EMAILPASS = 'lwpvdkdtytgqolja'
const bcrypt = require('bcryptjs')
const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAILPASS,
  },
})

app.use(bodyParser())
require('./db/conn')

app.post('/signup', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (user) {
      res.status(400).json({ message: 'User already registered' })
    } else {
      const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      })
      const data = await user.save()

      const token = jwt.sign({ _id: data._id, email: data.email }, SECRETKEY, {
        expiresIn: '30d',
      })
      console.log(token)
      const mailOption = {
        from: EMAIL,
        to: data.email,
        subject: 'COINTRACKER - verify your e-mail address',
        html: `<p>Hello Mr./Mrs. <strong>${
          data.firstName.slice(0, 1).toUpperCase() + data.firstName.slice(1)
        }</strong><br></p>
        <p>Thank you for signing up to Our Website.</p>
        <p>Please Verify your email address</p>
        <button><a href="http:${
          req.headers.host
        }/verify_email?token=${token}" style='text-decoration: none; font-weight : bold;'>Verify Your Email</a></button>
        `,
      }
      transport.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).json({ message: 'Email sent successfully!' })
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
})

app.get('/verify_email', async (req, res) => {
  try {
    const token = req.query.token
    const verify = jwt.verify(token, SECRETKEY)

    const user = await userModel.findOne({ _id: verify._id })

    if (user) {
      user.isVerified = true
      await user.save()
      res.status(200)
        .send(`<h1 style='text-align : center; color : green'>Email Verified Successfully</h1>
             <h3 style='text-align : center';>Go To Login Page To Login</h3>
             `)
    } else {
      res.status(400).send(
        `<h1 style='text-align : center; color : red'>Email Is Not Verified Or Verified</h1>
                   <h3 style='text-align : center'>Try To Login Or Go To Email</h3>
                   `,
      )
    }
  } catch (err) {
    console.log(err)
  }
})

app.post('/signin', verifyEmail, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (user) {
      const password = bcrypt.compare(req.body.password, user.password)
      if (password) {
        const token = jwt.sign({ _id: user._id }, SECRETKEY)
        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: token,
        })
      } else {
        res.status(401).json({ message: 'Invalid Credientials' })
      }
    } else {
      res.status(401).json({ message: 'Invalid Credientials' })
    }
  } catch (err) {
    console.log(err)
  }
})

app.get('/user', isAuth, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email })
    res.status(200).send({ data: user })
  } catch (err) {
    console.log(err)
  }
})

app.post('/track', isAuth, async (req, res) => {
  try {
    const tracker = new TrackerModel({
      email: req.body.email,
      target: req.body.target,
      coinType: req.body.coinType,

      userID: req.body.userID,
    })
    const target = await tracker.save()
    res.status(200).json({ target })
  } catch (e) {
    console.log(e)
  }
})

var data = []

app.get('/track', isAuth, async (req, res) => {
  try {
    console.log('isAuth', req.user)
    const track = await TrackerModel.find({ userID: req.user._id })
    console.log('jehec bc', track)
    res.status(200).json({ data: track })
  } catch {
    console.log(err)
  }
})

app.get('/track/:id', async (req, res) => {
  try {
    const track = await TrackerModel.findOne({ _id: req.params.id })
    if (track) {
      res.status(200).json({ data: track })
    } else {
      res.status(404).json({ message: 'Alert Not Found' })
    }
  } catch (err) {
    console.log(err)
  }
})

app.delete('/track/:id', isAuth, async (req, res) => {
  try {
    const track = await TrackerModel.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ message: 'Alert Delete Successfully' })
  } catch (err) {
    console.log(err)
  }
})

app.patch('/track/:id', async (req, res) => {
  try {
    console.log('in patch', req.body)
    const track = await TrackerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    )

    console.log('patch track', track)
    res.status(200).json({ message: 'Alert Update Successfully' })
  } catch (err) {
    console.log(err)
  }
})

cron.schedule('* * * * *', async () => {
  const options = {
    method: 'GET',
  }

  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
    options,
  )
    .then((response) => response.json())
    .then((response) => {
      // console.log(response)
      track(response)
      // data.unshift(response.map((ele) => ele))
      //   setCoins(response)
    })
    .catch((err) => {
      console.error(err)
    })

  // console.log('', data)
})

// console.log('data data data data', data)

const track = async (data) => {
  const user = await TrackerModel.find({})
  // const match = data[0].filter((da) => {
  //   return user.filter((us) => {
  //     return us.id === da.coinType && us.target <= da.current_price
  //   })
  // })
  // console.log('user found', user)
  // console.log('data found', data)
  // const match = user.filter((us) => {
  //   return us.coinType == data[0]?.symbol
  // })

  // const match = user.filter((us) => {
  //   return data.filter((da) => {
  //     return da?.symbol == us.coinType && da?.current_price <= +us.target
  //   })
  // })

  const coinType = user.filter((us) => {
    return data.some((da) => {
      console.log(da?.current_price, da?.symbol)
      console.log(da?.current_price, +us.target)
      return da?.current_price >= +us.target
    })
  })

  if (coinType.length > 0) {
    coinType.forEach((ele) => {
      const mailOption = {
        from: EMAIL,
        to: ele.email,
        subject: `!!!Alert!!! - coinTracker`,
        html: `<h2>Thank You ${ele.email} for registering on our site</h2>
 
        <p>Your Target for ${ele.coinType} coins of ${ele.target} is now Active</p>
        <p>So, Don't waste time. Please Checked It Now To achieve Your Target</p>
      `,
      }

      transport.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send('Mail Send Successfully')
        }
      })
    })
  }

  // if (coinType.length > 0) {
  //   const target = user.find((us) => {
  //     return coinType.current_price >= +us.target
  //   })
  // }

  console.log('CoinType', coinType)

  // console.log('data is matched', match)
}

app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
