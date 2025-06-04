// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// User routes
router.get('/user', todoController.getAllUsers);
router.post('/user', todoController.createUser);

// Task routes
router.get('/tasks', todoController.getAllTasks);
router.post('/tasks', todoController.createTask);

// Comment routes
router.get('/comments', todoController.getAllComments);
router.post('/comments', todoController.createComment);

// Tag routes
router.get('/tags', todoController.getAllTags);
router.post('/tags', todoController.createTag);

// HistoryAction routes
router.get('/history', todoController.getAllHistoryActions);
router.post('/history', todoController.createHistoryAction);

module.exports = router;
