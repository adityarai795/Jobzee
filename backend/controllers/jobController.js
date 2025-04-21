import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import UserSchema from "../models/userSchema.js";
import JobSchema from "../models/jobSchema.js";


export const getAllJobs = catchAsyncError(async (req, res, next) => {
    
    const jobs = await JobSchema.find({ expired: false });
    res.status(200).json({
        success: true,
         jobs
    });
})

export const postJob = catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Job Seeker"){
    return next(new ErrorHandler("You are not allowed to post a job", 403));
  }

  const { title, description, category, city, location, Salaryfrom, Salaryto } = req.body;
  if (!title || !description || !category || !city || !location || !Salaryfrom || !Salaryto) {
    return next(new ErrorHandler("Please fill all the fields 2", 400));
  }

  
  const job = await JobSchema.create({
    title,
    description,
    category,
    city,
    location,
    Salaryfrom,
    Salaryto,
    postedBy: req.user._id,
  });
  res.status(201).json({
    success: true,
    message: "Job posted successfully",
    job,
  });
})


export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Job Seeker"){
    return next(new ErrorHandler("You are not allowed to post a job", 403));
  }

  const jobs = await JobSchema.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const updateJob=catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Job Seeker"){
    return next(new ErrorHandler("You are not allowed to post a job", 403));
  }
  const {id}=req.params;
  let job= await JobSchema.findById(id);
  if(!job){
    return next(new ErrorHandler("Job not found", 404));
  }
  job= await JobSchema.findByIdAndUpdate(id, req.body, { runValidators: true,useFindAndModify: false });
  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    job,
  });
});

export const deleteJob=catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Job Seeker"){
    return next(new ErrorHandler("You are not allowed to post a job", 403));
  }
  const {id}=req.params;
  let job= await JobSchema.findById(id);
  if(!job){
    return next(new ErrorHandler("Job not found", 404));
  }

  await JobSchema.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
})

export const getSingleJob=catchAsyncError(async (req, res, next) => {

  const { id } = req.params;
  const job = await JobSchema.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
})