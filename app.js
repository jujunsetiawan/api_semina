const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1'

const categoriesRouter = require('./app/api/v1/categories/router')
const imagesRouter = require('./app/api/v1/images/router')
const talentsRouter = require('./app/api/v1/talents/router')
const eventsRouter = require('./app/api/v1/events/router')
const organizerRouter = require('./app/api/v1/organizers/router')
const authUserRouter = require('./app/api/v1/auth/router')

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
app.use(`${v1}/cms`, imagesRouter)
app.use(`${v1}/cms`, talentsRouter)
app.use(`${v1}/cms`, eventsRouter)
app.use(`${v1}/cms`, organizerRouter)
app.use(`${v1}`, authUserRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;