//external modules
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//local modules
const User = require('../models/userModel')
const { setUser } = require('../utils/auth')


exports.registerUser =asyncHandler(async(req,res)=>{
  const {name,email,password} = req.body
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please add all fields')
  }
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

//using bcrypt to hach pass
const salt  = await bcrypt.genSalt(10);
const hashedPassword  = await bcrypt.hash(password,salt)

//create user
  const user = await User.create({
    name,
    email,
    password:hashedPassword
  })
  console.log(user)
  if(user){
    res.status(201).json({
      _id:user.id,
      name:user.name,
      email:user.email,
     
    })
  }else{
    res.status(400);
    throw new Error("incorrect data")
  }
}) 

exports.loginUser = asyncHandler(async(req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
    res.status(400)
    throw new Error('Please add all fields')
  }
  const user = await User.findOne({email})
  if(!user){
        res.status(400)
    throw new Error('Please register')
  }

const mismactch = await bcrypt.compare(password,user.password)

if(!mismactch){
      res.status(400)
    throw new Error('invalid credentials')
}

const token = setUser(user);
res.cookie('uid',token)
console.log(token)

res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
})