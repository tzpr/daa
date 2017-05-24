'use strict';

const Mongoose = require('mongoose');


Mongoose.connect(process.env.MONGO_URI);

const db = Mongoose.connection;

// Use native ES6 promises (see http://mongoosejs.com/docs/promises.html)
Mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});
