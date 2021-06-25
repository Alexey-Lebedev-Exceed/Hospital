const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Date,
    default: Date.now
  },
  complaints: {
    type: String,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('visits', entrySchema);