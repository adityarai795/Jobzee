import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [1, 'Title must be at least 1 character long'],
    maxlength: [50, 'Title must be at most 100 characters long'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [1, 'Description must be at least 1 character long'],
    maxlength: [350, 'Description must be at most 500 characters long'],
  },
  category:{
    type: String,
    required: [true, 'Category is required'],
    enum: ['IT', 'Marketing', 'Finance', 'HR', 'Sales','Other'],
    default: 'IT',
  },
  city:{
    type: String,
    required: [true, 'City is required'],
    
  },
  location:{
    type: String,
    required: [true, 'Location is required'],
    minlength: [1, 'Location must be at least 1 character long']
  },
Salaryfrom:{
    type: Number,
    required: [true, 'Fixed Salary is required'],
    minlength: [4, 'Salary must be at least 1 character long'],
    maxlength: [10, 'Salary must be at most 50 characters long'],
  },
  Salaryto:{
    type: Number,
    required: [true, 'Salary is required'],
    minlength: [4, 'Salary must be at least 1 character long'],
    maxlength: [10, 'Salary must be at most 50 characters long'],
  },
  
  expired:{
    type: Boolean,
    default: false,
  },
  jobPostedOn:{
    type: Date, 
    default: Date.now,
  },
  postedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Posted by is required'],
  }

})

const JobSchema = mongoose.model('Job', jobSchema);

export default JobSchema;