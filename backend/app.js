const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const mongoose = require('mongoose');

const programsRoutes = require('./routes/programs-routes');

const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const jwt = require('jsonwebtoken');

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: true
   
  })
)
// app.use(express.static(path.join('public')));

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/programs', programsRoutes);
// app.use((req, res, next) => {
//   res.sendFile(path.resolve(__dirname, 'public/.next/server/pages', '_app.js' ));
// })
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rxpg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
