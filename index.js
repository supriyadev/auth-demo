// const winston =require('winston');
// require('winston-mongodb');
const users=require('./routes/users');
// const error=require('../middleware/errors');
const config=require('config');
const auth=require('./routes/auth');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
// const winston = require('winston/lib/winston/config');
const app = express();

const bodyParser= require('body-parser');


//middele ware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//caughtException
// const transport = new winston.transports.MongoDB({ db: 'mongodb://hostname/collectionname' });
  //  process.on('uncaughtException',(ex)=>{
  //    console.log('we console');
  //    winston.error(ex.message,ex);
  //  });
// winston.add(new winston.transports.File({filename:'logfile.log'}));
// winston.add( new winston.transports.MongoDB({ db: 'mongodb://localhost/User',level:'info' }));
// throw new Error('something worng');
// console.log('SUPPRESS_NO_CONFIG_WARNING: ' + config.util.getEnv('SUPPRESS_NO_CONFIG_WARNING'));

if (!config.get('jwttokenkey')) {
  console.error('FATAL ERROR: jwttokenkey is not defined.');
  process.exit(1);
}
mongoose.connect('mongodb://localhost/User')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  // app.use('/me',users);
  const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));