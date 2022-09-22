const mongoose = require('mongoose');

const connectToMongo = () => {
  mongoose.connect(process.env.DATABASE_URL, () => {
    console.log('Connected to mongodb successfully');
  });
};
module.exports = connectToMongo;
