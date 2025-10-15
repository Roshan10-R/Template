const { getUser } = require("../utils/auth");
const express = require('express')

const validateUser  =async (err,req,res,next)=>{


  
const authorizationHeader =   req.headers["authorization"] ;
req.user = null 
if( !authorizationHeader || !authorizationHeader.startWith("bearer"))
  return next();

const token = useruid.split("bearer ")[1];

const user = getUser(token)

req.user = user;
next();
}

const authoriseUser = (err,req,res,next)=>{

}