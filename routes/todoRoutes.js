const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// Middleware d'authentification (si tu en as un)
// const { protect } = require('../middlewares/authMiddleware');

router.post('/tasks', todoController.createTask);
router.get('/tasks', todoController.getTasks);
router.put('/tasks/:id', todoController.updateTask);
router.delete('/tasks/:id', todoController.deleteTask);

router.post('/tasks/:taskId/subtasks', todoController.addSubTask);
router.put('/tasks/:taskId/subtasks/:subTaskId', todoController.updateSubTask);
router.delete('/tasks/:taskId/subtasks/:subTaskId', todoController.deleteSubTask);

router.post('/tasks/:taskId/comments', todoController.addComment);

module.exports = router;
