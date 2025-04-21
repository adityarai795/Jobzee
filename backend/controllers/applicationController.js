import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import UserSchema from "../models/userSchema.js";
import JobSchema from "../models/jobSchema.js";
import ApplicationSchema from "../models/applicationSchema.js";
import cloudinary from "cloudinary";

export const employergetAllApplications = catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Job Seeker"){
    return next(new ErrorHandler("You are not allowed to post a job because you are Job Seeker", 403));
  }
  const employerId = req.user._id;
  const applications = await ApplicationSchema.find({ 'employerId.user': employerId });

  res.status(200).json({
    success: true,
    applications,
  });
})


export const jobSeekergetAllApplications = catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Employer"){
    return next(new ErrorHandler("You are not allowed to post a job", 403));
  }
  const { _id } = req.params;
  const applications=await ApplicationSchema.find({'application_user':_id});
  res.status(200).json({
    success: true,
    applications,
  });
})

export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {

  const {role}=req.user;
  if(role ==="Employer"){
    return next(new ErrorHandler("You are not allowed to view applications", 403));
  }
  const { id } = req.params;
  const applications=await ApplicationSchema.findById(id);
  if(!applications) {
    return next(new ErrorHandler("Application not found", 404));
  }
  await ApplicationSchema.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    applications,
  });
})


export const postApplication=catchAsyncError(async (req, res, next) => {
  const {role}=req.user;
  if(role ==="Employer"){
    return next(new ErrorHandler("You are not allowed to view applications", 403));
  }
  console.log("REQ BODY = ", req.body);

  const {name,email,coverLetter,phone,address,jobId}=req.body;
  const applicantId={
    user:req.user._id,
    role:"Job Seeker",

  }
  if(!jobId){
    return next(new ErrorHandler("Please provide a job ID", 400));
  }
  const jobDetails=await JobSchema.findById(jobId);
  if(!jobDetails){
    return next(new ErrorHandler("Job not found", 404));
  }
  const employerId={
    user:jobDetails.postedBy,
    role:"Employer",
  }
  if(!name || !email || !coverLetter || !phone || !address ){
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const application =await ApplicationSchema.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantId,
    employerId,
  });
  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    application,
  });
});


// 3.23 minute



  // if(!req.files || Object.keys(req.files).length === 0) {
  //   return next(new ErrorHandler("Please upload a resume", 400));
  // }
  // const {resume}=req.files;
  // console.log("Resume file info",resume )
  // // const {name}=req.body;
  // const allowedFormat=["image/png","image/jpg","image/jpeg","image/webp"];
  // if(!allowedFormat.includes(resume.mimetype)){
  //   console.log("Invalid file type:", resume.mimetype);
  //   return next(new ErrorHandler("Please upload a valid image", 400));
  // }
  // const cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath, {
  //   folder: "resumes",
  // });
  // if(!cloudinaryResponse || cloudinaryResponse.error){ 
  //   console.error("Error uploading to cloudinary", cloudinaryResponse.error);
  //   return next(new ErrorHandler("Please upload a valid image failed", 500));
  // }