import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  message: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
