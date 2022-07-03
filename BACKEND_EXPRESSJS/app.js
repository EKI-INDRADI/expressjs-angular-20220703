let express = require('express');
let logger = require('morgan');
let app = express();


// ============= SECURITY CORS
let header_middleware = require("./middlewares/headers"); // 27-09-2021
app.use(header_middleware);
// ============= SECURITY CORS

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// =============  (NOT USED) scheduler injection (CLEAR TOKEN EXPIRED NOT USED)
// let cron_middleware = require("./middlewares/cron"); 
// app.use(cron_middleware);

// let cron_middleware = require("./middlewares/cron2"); 
// cron_middleware.cronjob(app);
// ============= /  (NOT USED) scheduler injection (CLEAR TOKEN EXPIRED NOT USED)


app.use('/status', (req, res) => {
  res.json({ statusCode: 1, message: 'API TEST IS OK!' });
});

// ============= connection
let connection = require("./middlewares/connection")
connection.mongodb()
// ============= connection



const API_3RD_test_router = require('./routes/test.routes');
app.use('/ekitesting/v1/test', API_3RD_test_router);


// ============= SECURITY JWT
let tokenJwt_middleware = require("./middlewares/tokenJwt");  // ENABLE JWT
tokenJwt_middleware.tokenJwt(app);
// ============= /SECURITY JWT


const API_3RD_auth_router = require('./routes/auth.routes')
app.use('/ekitesting/v1/auth', API_3RD_auth_router);


app.use('/check-token', (req, res) => {
  res.json({ statusCode: 1, message: 'JWT ENABLE' });
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ statusCode: 0, message: err.message })
});




module.exports = app;
