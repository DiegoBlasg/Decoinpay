const expres = require('express');
const cors = require('cors');
const app = expres();

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(cors());
app.use(expres.json());

// routes
app.use('/contracts', require('./routes/contracts'))
app.use('/users', require('./routes/users'))

module.exports = app;