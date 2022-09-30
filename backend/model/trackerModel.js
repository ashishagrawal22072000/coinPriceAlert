const mongoose = require('mongoose')

const TrackerSchema = new mongoose.Schema(
  {
    email: {
      type: 'string',
    },
    target: {
      type: 'string',
    },
    coinType: {
      type: 'string',
    },
    userID: {
      type: 'string',
    },
  },
  {
    timestamps: true,
  },
)

const TrackerModel = mongoose.model('Tracker', TrackerSchema)

module.exports = TrackerModel
