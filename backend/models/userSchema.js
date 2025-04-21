import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [1, 'Name must be at least 1 character long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate:[validator.isEmail, 'Please enter a valid email address'],
  },
  phone:{
    type:Number,
    required: [true, 'Phone number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [1, 'password must be at least 1 character long'],
    maxlength: [10, 'password must be at most 50 characters long'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Job Seeker', 'Employer'],
    default: 'Employer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// compare password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJWTToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.jwt_secret_key, { expiresIn: '1d' });
  return token;
};

const UserSchema = mongoose.model('User', userSchema);

export default UserSchema;