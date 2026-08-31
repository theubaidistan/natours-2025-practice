const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

/*
const handleDuplicateFieldsDB = (err) => {

  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
*/

//^ CHATGPT
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  // const message = `Duplicate field value: "${field}" = "${value}". Please use another value!`;
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please login in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  // console.log('ERROR 💥', err);

  //* API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //* RENDERED WEBSITE
  console.log('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  //* A) API
  if (req.originalUrl.startsWith('/api')) {
    //^ A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        // stack: err.stack,
      });
    }
    //^ B) Programming or other unknown error: don't leak error details
    //^ 1) Log error
    console.log('ERROR 💥', err);

    //^ 2) Send Generic Message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  //* B) RENDERED WEBSITE
  //^ A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  //^ B) Programming or other unknown error: don't leak error details
  //^ 1) Log error
  console.log('ERROR 💥', err);

  //^ 2) Send Generic Message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Plaese try again later.',
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  // console.log('❌ ERROR:', err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
    // ^ORGINAL
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    let error = { ...err, name: err.name, message: err.message };
    // error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // if (error instanceof AppError) {
    //   error.isOperational = true;
    // }
    sendErrorProd(error, req, res);
  }

  // ^ CHATGPT
  // if (process.env.NODE_ENV === 'production') {
  //   let error = Object.assign(new Error(), err);
  //   error.message = err.message;
  //   error.name = err.name;

  //   if (error.name === 'CastError') error = handleCastErrorDB(error);
  //   if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  //   if (error.name === 'ValidationError')
  //     error = handleValidationErrorDB(error);
  //   if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
  //   if (error.name === 'TokenExpiredError') error = handleJWTError(error);

  //   sendErrorProd(error, res);
  // } else {
  //   sendErrorDev(err, res);
  // }
};
