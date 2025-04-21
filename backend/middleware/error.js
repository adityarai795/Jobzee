class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message=err.message || "Internal Server Error";
  err.statusCode=err.statusCode || 500;

  if(err.name === "CastError"){
    const message=`Resource not found. Invalid: ${err.path}`;
    err=new ErrorHandler(message, 400);
  }

  
  if(err.code === 11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
    err=new ErrorHandler(message, 400);
  }
  
  if(err.name === "jsonWebTokenError"){
    const message=`jwt is invalid. Please try again`;
    err=new ErrorHandler(message, 400);
  }
  
  if(err.name === "TokenExpiredError"){
    const message=`jwt has expired. Please log in again`;
    err=new ErrorHandler(message, 401);
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

export default ErrorHandler;