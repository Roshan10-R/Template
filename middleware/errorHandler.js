const errorHandler = (err,req,res,next)=>{
  const statusCode = res.statusCode ?res.statusCode:500
  switch(statusCode){
    case 404:
      res.json({
        tittle:'Resource not found',
        message:err.message ,
        stack:  err.stackTrace,
      })
      break;
    case 401:
      res.json({
        message: 'Unauthorized',
        stack:  err.stackTrace,
      })
      break;
    case 500:
      res.json({
        message: 'Internal Server Error',
        stack:  err.stackTrace,
      })
      break;
    case 403:
      res.json({
        message: 'Forbidden',
        stack:  err.stackTrace,
      })
      break;
    case 400:
      res.json({
        message: 'Bad Request',
        stack:  err.stackTrace,
      })
      break;
      
    case 409:
    default:
     
      break;  
  }

  }
module.exports = errorHandler;