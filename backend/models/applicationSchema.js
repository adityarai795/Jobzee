import mongoose from 'mongoose';

import validator from 'validator';

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, 'Please provide a name'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [30, 'Name must be at most 30 characters long']
  },
  email:{
    type: String,
    required: [true, 'Please provide an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    },
    unique: true
  },
  coverLetter:{
    type: String,
    required: [true, 'Please provide a cover letter'],
  },
  phone:{
    type:Number,
    required: [true, 'Please provide a phone number'],
  },
  address:{
    type: String,
    required: [true, 'Please provide an address'],
  },

  applicantId:{
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Applicant ID is required'],
      },
      role:{
        type: String,
        required: [true, 'Role is required'],
        enum: ["Job Seeker"],
      }
  
  },
  
  employerId:{
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Employer ID is required'],
    },
    role:{
      type: String,
      required: [true, 'Role is required'],
      enum: ["Employer"],
    }



  }
  
})

 const ApplicationSchema = mongoose.model('Application', applicationSchema);
export default ApplicationSchema;