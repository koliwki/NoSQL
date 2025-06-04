// controllers/todoController.js
const { User, Task, Comment, Tag, HistoryAction } = require('../models/models');

// User controllers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Task controllers
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('userId');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Comment controllers
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('taskId');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComment = async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tag controllers
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTag = async (req, res) => {
  const tag = new Tag(req.body);
  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// HistoryAction controllers
exports.getAllHistoryActions = async (req, res) => {
  try {
    const historyActions = await HistoryAction.find().populate('userId').populate('taskId');
    res.json(historyActions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHistoryAction = async (req, res) => {
  const historyAction = new HistoryAction(req.body);
  try {
    const newHistoryAction = await historyAction.save();
    res.status(201).json(newHistoryAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
