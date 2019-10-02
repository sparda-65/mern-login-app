const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
const v1 = require('./routes/v1');
const app = express();

// ---------------BD Config---------//
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
connection.once('error', (err) => {
    console.error(`faild to connect to MongoDB database:${err}`);
  });

// ---------------Moddlewares---------//
app.use(logger('dev'));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Implement serializeUser methods
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ---------------Routes---------//
app.use('/api/v1',v1);

// ---------------ERRORS---------//
app.use((req, res, next)=>{ //404 Not Found
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((err , req , res , next)=>{ 
  const status= err.status || 500;
  const error= err.message|| 'Error Processing your request';

  res.status(status).send({
    error
  })
});

module.exports= app;