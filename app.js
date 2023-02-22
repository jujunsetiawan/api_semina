const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1'

const categoriesRouter = require('./app/api/v1/categories/router')

const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMiddleware = require('./app/middlewares/handler-error')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({ status: 'succsess', message: 'Welcome to api semina' })
});
app.use(`${v1}/cms`, categoriesRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;
