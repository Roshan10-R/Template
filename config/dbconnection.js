const mongoose = require('mongoose')


const dbconnetion = async ()=>{

try{
 const connect = await  mongoose.connect(process.env.MONGO_URI)
 console.log("db conneted :",connect.connection.host)
}catch(err){
  console.log(err);
  process.exit(1);
}


}
module.exports= dbconnetion;