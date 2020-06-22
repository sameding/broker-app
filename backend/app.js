const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const apiRouter = require('./routes/apiRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(cors());

// 3) ROUTES
app.use('/api/v1/', apiRouter);



module.exports = app;
