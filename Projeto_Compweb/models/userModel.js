'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/**
 * User Schema
 */
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'An username is required']
  },
  hashPassword: {
    type: String,
    required: [true, 'An password is required']
  },
  isAdmin : {
    type : Boolean,
    unique : false,
    default: false,
  },
});

const User = mongoose.model('User', UserSchema)


export default User