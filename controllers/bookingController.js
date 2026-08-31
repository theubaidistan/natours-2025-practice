// const multer = require('multer');
// const sharp = require('sharp');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

/*
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //* 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  console.log(tour);
  //* 2) Create chheckout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });
  //* 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
*/

//* API(CHAPTGPT)
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //* 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  // console.log(tour);

  //* 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment', // required in latest API
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    metadata: {
      price: tour.price.toString(),
    },

    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100, // cents
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            // images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  //* 3) Send session to client
  res.status(200).json({
    status: 'success',
    session,
  });
});

/*
exports.createBookingCheckout = async (req, res, next) => {
  //* This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
  //* next();
};
*/

const createBookingCheckout = async (session) => {
  console.log(session);
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  // const price = session.display_items[0].amount / 100;
  const price = Number(session.metadata.price);
  console.log(user);
  console.log(tour);
  console.log(price);
  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = async (req, res, next) => {
  console.log('WEBHOOK RECEIVED');
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log(event.type);
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    // createBookingCheckout(event.data.object);
    console.log('Creating booking...');
  await createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
