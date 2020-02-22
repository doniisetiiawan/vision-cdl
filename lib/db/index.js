const mongoose = require('mongoose');
const config = require('../configuration');

const connectionString = config.get('mongo:url');
const options = {
  server: { auto_reconnect: true, poolSize: 10 },
};

mongoose.connection.open(connectionString, options);
