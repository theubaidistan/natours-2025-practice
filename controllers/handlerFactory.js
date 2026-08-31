const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
    /*
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      mesaage: err,
    });
  }
    */
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        // tour: '<Updated tour here...>',
        data: doc,
      },
    });
    /*
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      mesaage: err,
    });
  }
    */
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    /*
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {

  const newTour = newTour({});
  newTour.save();
*/
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });

    /*
  try {
    //*   },
    //* );
    //* res.send('Done');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      //* mesaage: 'Invalid data sent!',
      message: err,
    });
  }
    */
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    // const doc = await Model.findById(req.params.id).populate('reviews');
    // Tour.findOne({_id:req.params.id})

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
    /*
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
 const tour = tours.find((el) => el.id === req.params);
 res.status(200).json({
     status: 'success',
     results: tours.length,
     data: {
         tour,
         },
       });
      */
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //* To allow for nested GET reviews on tour(hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    //^ SEND RESPONSE
    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: doc.length,
      data: {
        data: doc,
      },
    });

    /*
  console.log(req.requestTime);
  console.log(req.query);

  //*BUILD QUERY
  //*1A) Filtering
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj);

     1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));
    console.log(JSON.parse(queryStr));
    { difficulty:'easy',duration:{ $gte:5 }}
    { difficulty: 'easy', duration: { gte: '5' } }
    gte,gt,lte,lt

    const query = Tour.find(queryObj);

    2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
       console.log(sortBy);
       query = query.sort(req.query.sort);
      query = query.sort(sortBy);
      sort('price ratingsAverage')
    } else {
      query = query.sort('-createdAt');
    }

    3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //* page=2&limit=10, 1-10 ,page 1, 11-20 ,page 2, 21-30 page 3
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
  }
  */
    // EXECUTE QUERY
    // const tours = await Tour.find().select('-__v').skip(skip).limit(limit);
    // query.sort().select().skip().limit()
    /*
  const query = await Tour.find({
    duration: 5,
    difficulty: 'easy',
  });
*/
    /*
   
    const tours = await Tour.find({
      duration: 5,
      difficulty: 'easy',
    });

    const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
      //*SEND RESPONSE
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
    */
  });
