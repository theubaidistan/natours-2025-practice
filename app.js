const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorhandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

// Start express app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//^ 1) GLOBAL MIDDLEWARES

//* Serving static files
app.use(express.static(path.join(`${__dirname}/public`)));

//* Set security HTTP headers
app.use(helmet()); //! --> FOR HACKING XSS Protection
// app.use(morgan('tiny'));

// console.log(process.env.NODE_ENV);

//* Development loging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(morgan('dev'));

//* Limit requests from same API
const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});

app.use('/api', limiter);

//* Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//* Data santitization against NoSQL query injection
app.use(mongoSanitize());
//* Data santitization against XSS.
app.use(xss());

//* Prevent Pararmeter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// app.use(express.static(`${__dirname}/public`));

/*
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});
*/

app.use(compression());

//* Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});

/*
app.get('/', (req, res) => {
  //* res.status(200).send('Hello form the server side!');
  res
    .status(200)
    //* .status(404)
    .json({ message: 'Hello form the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});
*/

// 2) ROUTE HANDLERS

// ^Users

// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {
/*
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);

app.post('/api/v1/tours', createTour);

app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/

//* 3) ROUTES

// app.route('/api/v1/tours').get(getAllTours).post(createTour);

/*
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);
*/

// Set CSP globally for all responses
/*
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' https://unpkg.com 'unsafe-inline' blob:",
      "style-src 'self' https://unpkg.com https://fonts.googleapis.com 'unsafe-inline'",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "connect-src 'self' https://demotiles.maplibre.org https://api.maptiler.com", // 👈 Added
    ].join('; '),
  );
  next();
});
*/

/*
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",

      // ✅ Stripe + Unpkg + Inline
      "script-src 'self' https://unpkg.com https://js.stripe.com 'unsafe-inline' blob:",

      // ✅ Styles from self, unpkg, and Google Fonts
      "style-src 'self' https://unpkg.com https://fonts.googleapis.com 'unsafe-inline'",

      // ✅ Google Fonts host
      "font-src 'self' https://fonts.gstatic.com",

      // ✅ Images + Stripe tracking (r.stripe.com)
      "img-src 'self' data: blob: https://r.stripe.com",

      // ✅ Web workers
      "worker-src 'self' blob:",

      // ✅ Network calls (Stripe, Maps, etc.)
      "connect-src 'self' https://api.stripe.com https://m.stripe.network https://r.stripe.com https://demotiles.maplibre.org https://api.maptiler.com",

      // ✅ Frames (needed for Stripe checkout popup/redirect)
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    ].join('; '),
  );
  next();
});
*/

const isDev = process.env.NODE_ENV === 'development';

const connectSrc = [
  "'self'",
  'https://api.stripe.com',
  'https://m.stripe.network',
  'https://r.stripe.com',
  'https://demotiles.maplibre.org',
  'https://api.maptiler.com',
];

if (isDev) {
  connectSrc.push('ws://127.0.0.1:*');
}

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' https://unpkg.com https://js.stripe.com 'unsafe-inline' blob:",
      "style-src 'self' https://unpkg.com https://fonts.googleapis.com 'unsafe-inline'",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://r.stripe.com",
      "worker-src 'self' blob:",
      `connect-src ${connectSrc.join(' ')}`,
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    ].join('; '),
  );
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  /*
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });

  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
  */
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorhandler);

// app.js

//^ 4) START SERVER
module.exports = app;
