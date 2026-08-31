const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down..');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true, // ✅ this line removes the warning
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log(`DB connection successful!`);
  });
// .catch((err) => console.log('ERROR'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! 💥 Shutting down..');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process Terminated');
  });
});

/*
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModiy: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log(`DB connection successful!`);
  });
  */

/*
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // ✅ add this
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connection successful!`);
  });
*/

/*
const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR 💥 :', err);
  });
*/

//^CHATGPT:SOLUTION
/*

// Insert "The Forest Hiker" only after deleting if exists
(async () => {
  try {
    await Tour.deleteOne({ name: 'The Forest Hiker' }); // Prevent duplicate
    const testTour = new Tour({
      name: 'The Forest Hiker',
      rating: 4.7,
      price: 497,
    });
    const doc = await testTour.save();
    console.log(doc);
  } catch (err) {
    console.log('ERROR 💥 :', err);
  }
})();
*/

/* 
console.log(app.get('env'));
console.log(process.env); 

const x = 23;
x = 66;
const y = x + 2;
y = 54;

const x = 23;
x = 23;
const y = x + 2;
const q = 12;
const z = q + 3;
const z = 3;
const q=z + 6;
*/

/*
// Insert "The Forest Hiker" only after deleting if exists
(async () => {
  try {
    await Tour.deleteOne({ name: 'The Forest Hiker' }); // Prevent duplicate
    const testTour = new Tour({
      name: 'The Forest Hiker',
      rating: 4.7,
      price: 497,
    });
    const doc = await testTour.save();
    console.log(doc);
  } catch (err) {
    console.log('ERROR 💥 :', err);
  }
})();
*/
