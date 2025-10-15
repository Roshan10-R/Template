const jwt = require("jsonwebtoken")
const secrect = 'roshan123'
exports.setUser = (user)=>{
  return jwt.sign({
    id:user._id,
    email:user.email
  },secrect,{
    expiresIn:'30d'
  })
}
exports.getUser= (token)=>{
  if(!token) return null;
  return jwt.verify(token,secrect)
}