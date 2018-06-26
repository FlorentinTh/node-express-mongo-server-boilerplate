import mongoose from 'mongoose';
import MongooseConnectionConfig from 'mongoose-connection-config';

import logger from '@Logger';
import config from '@Config';

const options = {
  host: process.env.MONGO_HOST || config.mongo.host,
  port: process.env.MONGO_PORT || config.mongo.port,
  database: config.mongo.db,
  connectOptions: {
    user: config.mongo.username,
    pass: config.mongo.password,
  },
};

const connectionConfig = new MongooseConnectionConfig(options);

mongoose.Promise = global.Promise;

const connect2MongoDB = (() => {
  mongoose.connect(connectionConfig.getMongoUri())
    .then(() => {
      logger.info('Successfully connected to MongoDB');
    }).catch((err) => {
      logger.error(`Can't connect to MongoDB, reason : ${err}`);
    });
});

export default connect2MongoDB;
