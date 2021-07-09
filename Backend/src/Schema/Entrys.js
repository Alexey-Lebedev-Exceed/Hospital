const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const entrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  complaints: {
    type: String,
    required: true
  },
  user: {
    type: String
  }
})

module.exports = mongoose.model('visits', entrySchema);