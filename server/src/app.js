const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');


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
// ---------------Routes---------//
app.post('/hello', (req, res)=>{
  const name =req.body.name;
  res.send({
    message: `welcome ${name}`
  });

});
module.exports= app;