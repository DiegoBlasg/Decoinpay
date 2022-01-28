const expres = require('express');
const cors = require('cors');
const app = expres();

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(cors());
app.use(expres.json());

// routes
app.use('/api/contracts', require('./routes/contracts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/transactions', require('./routes/transactions'))

module.exports = app;