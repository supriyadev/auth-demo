const mongoose =require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');


const userSchema =new mongoose.Schema({
    name:{

        type:String,
        required:true,
        maxlength:20,
        minlength:5,
        
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
        required:true,
        uniqui:true

    },
    //for password more complixy use pakage 
    password:
    {
        type:String,
        required:true,
        maxlength:255,
        minlength:5,
        },
    isAdmin:Boolean
    // roles:[]
    // operation:[]

});

userSchema.methods.generateAuthToken=function(){
  const token = jwt.sign({_id:this.id},config.get('jwttokenkey'));//send secrate code to server
  return token;

}

const User =mongoose.model('User',userSchema);

function validateUser(user){
    const schema =Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required(),
        password:Joi.string().min(5).max(20).required(),


    });
    return validate = schema.validate(user);

}

exports.User=User;
exports.validate=validateUser;

