const express = require('express');
var cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
// mongo connection
const connectToMongo = require('./db');
connectToMongo();

const port = process.env.PORT || 5000;
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/user'));
app.use('/api/books', require('./routes/favBooks'));
app.use('/api/comments', require('./routes/comments'));

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
