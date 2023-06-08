'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/**
 * User Schema
 */
var TaskSchema = new Schema({
  tasks : {
    type: String,
    unique : false,
    required : true,
  },
    taskowner : [{ 
      type: Schema.Types.ObjectId, ref: 'User' 
    }]
});

const Task = mongoose.model('Task', TaskSchema)

export default Task