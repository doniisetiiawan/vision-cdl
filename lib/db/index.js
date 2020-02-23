const mongoose = require('mongoose');
const config = require('../configuration');

const connectionString = config.get('mongo:url');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(connectionString, options);
