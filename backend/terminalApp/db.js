const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on('error', err => console.log(err))

module.exports = {
    connection
}