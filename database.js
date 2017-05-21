const Mongoose = require('mongoose');
const config = require('./config');
const dbUri = config.mongoURI(process.env.NODE_ENV);

console.log('DADAA. NODE_ENV: ' + process.env.NODE_EN);

Mongoose.connect(dbUri);

const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
