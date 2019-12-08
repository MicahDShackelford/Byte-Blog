const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simple-blog', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = Promise;

const database = mongoose.connection;
database.on('error', () => {
  console.log(`[Database] There was an error connecting to the database`);
});
database.once('open', () => {
  console.log(`[Database] Connection Successful`);
});

module.exports = database;