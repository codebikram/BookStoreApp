const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavBookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  infoLink: {
    type: String,
  },
  viewLink: {
    type: String,
  },
  language: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('favbooks', FavBookSchema);
