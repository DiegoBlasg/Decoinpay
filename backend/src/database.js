const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://localhost/cryptopagos';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Db is connected');
})
