const mongoose = require('mongoose');
const Credstash = require('nodecredstash');
const bcrypt = require('bcrypt-nodejs');

const models = require('./models');

const credstash = new Credstash({ awsOpts: { region: 'us-east-1' } });

mongoose.Promise = Promise;
const connectionPromise = credstash.getSecret({
  name: 'db.connection.test',
  context: { environment: 'test' }
}).then(dbConnectionString => mongoose.connect(dbConnectionString, { useMongoClient: true }));

function seedDB(fixtures) {
  return connectionPromise.then(() => {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Mongoose is not connected.');
    }

    return Promise.all(Object.keys(fixtures).map((modelName) => {
      const model = models[modelName];
      if (!model) {
        throw new Error(`${modelName} is not a valid Mongoose model.`);
      }
      return model.insertMany(fixtures[modelName]);
    }));
  });
}

function clearDB() {
  return connectionPromise.then(() => {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Mongoose is not connected.');
    }
    return mongoose.connection.db.dropDatabase();
  });
}

function hashUserPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) { return reject(err); }
      return resolve(hash);
    });
  });
}

module.exports = {
  seedDB,
  clearDB,
  hashUserPassword
};
