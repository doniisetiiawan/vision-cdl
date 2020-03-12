import mongoose from 'mongoose';
import config from '../configuration';

const connectionString = config.get('mongo:url');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(connectionString, options);
