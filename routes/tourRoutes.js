const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');
// const { getAllTours } = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

/*
//* POST /tour/234fad4/reviews
//* POST /tour/234fad4/reviews
//* POST /tour/234fad4/reviews/94887fda
//* /reviews

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );
*/

/*
1) Create a checkbody middleware
2) Check if body contains the name and price property
3) If not ,send back 400 (bad request)
4) Add it to the post handler stack
*/

/*
router.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});
*/

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);

//* /tours-within?distance=233&center=-40,45&unit=mi
//* /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
