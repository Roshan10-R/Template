const express = require('express')


//external mod
const dbconnection = require("./config/dbconnection")
const app = express();
const dotenv = require('dotenv');
//local mod
const userRoutes = require('./routes/userRouter');
const errorHandler = require('./middleware/errorHandler')

dotenv.config();

dbconnection();
app.use(express.json())

app.use('/users',userRoutes)
app.use(errorHandler)

const port = process.env.port





app.listen(process.env.port,()=>{
 console.log( `server starting at http://localhost:${port }`);
})
    