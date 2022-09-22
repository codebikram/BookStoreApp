const mongoose = require('mongoose');

let commentschema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: {
    type: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('comments', commentschema);
