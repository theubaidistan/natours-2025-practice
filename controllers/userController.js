const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

/*
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    //* user-767676abc76dba-33232376764.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});
*/
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  if (!cloudinary.isConfigured) {
    return next(
      new AppError(
        'Profile image storage is not configured. Add the Cloudinary environment variables in the deployment settings.',
        503,
      ),
    );
  }

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'natours/users',
        public_id: `user-${req.user.id}`,
        overwrite: true,
        invalidate: true,
        resource_type: 'image',
        transformation: [
          {
            width: 500,
            height: 500,
            crop: 'fill',
            gravity: 'face',
          },
        ],
      },
      (error, uploadResult) => {
        if (error) return reject(error);
        resolve(uploadResult);
      },
    );

    uploadStream.end(req.file.buffer);
  }).catch((error) => {
    const cloudinaryMessage = String(error.message || '');
    const cloudinaryStatus = error.http_code || error.httpCode;

    // eslint-disable-next-line no-console
    console.error('CLOUDINARY_PROFILE_UPLOAD_FAILED', {
      message: cloudinaryMessage,
      status: cloudinaryStatus,
      name: error.name,
    });

    if (
      cloudinaryStatus === 401 ||
      cloudinaryStatus === 403 ||
      /api.?key|signature|credential|authentication/i.test(cloudinaryMessage)
    ) {
      throw new AppError(
        'Cloudinary rejected the upload credentials. Verify the Cloudinary environment variables in Vercel.',
        502,
      );
    }

    if (
      cloudinaryStatus === 400 ||
      /invalid image|unsupported/i.test(cloudinaryMessage)
    ) {
      throw new AppError(
        'Cloudinary rejected this image. Choose a valid JPG, PNG, or WEBP image smaller than 5 MB.',
        400,
      );
    }

    throw new AppError(
      'Cloudinary could not process the image right now. Please try again.',
      502,
    );
  });

  req.body.photo = result.secure_url;
  req.body.photoPublicId = result.public_id;

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  //* 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `This route is not for password updates. Please use /updateMyPassword.`,
        400,
      ),
    );
  }
  //^ body.role:'admin'

  //^ 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) {
    filteredBody.photo = req.body.photo;
    filteredBody.photoPublicId = req.body.photoPublicId;
  }

  //* 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // user.name = 'Jonas';
  // await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

//* Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
/*
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
*/
exports.deleteUser = factory.deleteOne(User);
