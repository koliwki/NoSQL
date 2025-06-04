// models.js
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now }
});

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'] },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }]
});

// Comment Schema
const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }
});

// Tag Schema
const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String }
});

// HistoryAction Schema
const HistoryActionSchema = new mongoose.Schema({
  actionType: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }
});

// Exporting models
module.exports = {
  User: mongoose.model('User', UserSchema),
  Task: mongoose.model('Task', TaskSchema),
  Comment: mongoose.model('Comment', CommentSchema),
  Tag: mongoose.model('Tag', TagSchema),
  HistoryAction: mongoose.model('HistoryAction', HistoryActionSchema)
};
