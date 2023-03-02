const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://ashish:ashish@cluster0.agrqdne.mongodb.net/?retryWrites=true&w=majority',
  )
  .then((res) => {
    console.log('Connection established')
  })
  .catch((err) => {
    console.log(err)
  })
