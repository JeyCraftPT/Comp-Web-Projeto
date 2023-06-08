'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/**
 * User Schema
 */
var NotasSchema = new Schema({
  nota: {
    type: String,
    unique: false,
    required : true,
  },
  notaowner : [{ 
    type: Schema.Types.ObjectId, ref: 'User' 
  }]
});

const Nota = mongoose.model('Nota', NotasSchema)


export default Nota