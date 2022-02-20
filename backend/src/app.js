const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
}

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/contracts', require('./routes/contracts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/transactions', require('./routes/transactions'))

module.exports = app;