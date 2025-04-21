import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import UserSchema from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";


export const register = catchAsyncError(async (req, res, next) => {
    const {name, email, phone, password, role} = req.body;
    if(!name || !email || !phone || !password || !role){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const isEmail = await UserSchema.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already exists", 400));
    }
    const user = await UserSchema.create({
        name,
        email,
        phone,
        password,
        role
    });
    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user
    })
    sendToken(user, 200, res, "User registered successfully")
})


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const user = await UserSchema.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("Invalid role", 401));
    }
    sendToken(user, 200, res, "User logged in successfully")
});


export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "User logged out successfully",
    })
})

export const getUser = catchAsyncError(async (req, res, next) => {
    const  user  = req.user;
    
    res.status(200).json({
        success: true,
        user,
    })
});