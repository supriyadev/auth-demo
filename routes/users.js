const _ =require('lodash');
// const error=require('../middleware/errors');
const jwt=require('jsonwebtoken');
const auth =require('../middleware/auth');
const config=require('config');
const bcrypt=require('bcrypt');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer=require('multer');
// const upload = multer({ dest: './public/data/uploads/' });

const fs=require('fs');
const path=require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //   console.log("filename " + file.originalname);
  //   cb(null,file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }).single("file");

router.get('/me',auth,async(req,res)=>{
  
  // throw new Error('could not connect');
  console.log('hello');
  const user=await User.findById(req.user._id).select('-password');
  res.send(user);

});
router.put('/upload',upload,async(req,res)=>{

res.send("upload file");
});

router.post('/',async (req,res)=>{
  
  
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

  //send secrate code to server

    // user =new User({
    //    name:req.body.name,
    //    email:req.body.email,
    //    password:req.body.password

    // });// repeating req.body we can use _ lodash using pick []method

  
    user = new User(_.pick(req.body, ['name', 'email', 'password','image']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
   await user.save();
    // res.send(user);
    
  
    const token = user.generateAuthToken();
    // const token = jwt.sign({_id:user.id},config.get('jwttokenkey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports=router;