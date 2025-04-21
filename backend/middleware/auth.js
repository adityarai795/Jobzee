import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from "./error.js";
import UserSchema from "../models/userSchema.js";
import jwt from "jsonwebtoken"; 


export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const {token} = req.cookies;
  if(!token){
    return next(new ErrorHandler("Unauthorized access", 401))

  }
  const decode= jwt.verify(token, process.env.jwt_secret_key);
  req.user = await UserSchema.findById(decode._id).populate('role');
  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }
  next();
});