const asyncHandler = require('express-async-handler');
const Task = require('../models/models').Task;
const SubTask = require('../models/models').SubTask;
const Comment = require('../models/models').Comment;

// Créer une tâche
exports.createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, tags, user } = req.body;
    const task = await Task.create({ title, description, dueDate, tags, user });

    res.status(201).json({
        success: true,
        data: task,
        message: 'Task created successfully'
    });
});

// Obtenir toutes les tâches d'un utilisateur
exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({
        success: true,
        data: tasks
    });
});

// Mettre à jour une tâche
exports.updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({
        success: true,
        data: task,
        message: 'Task updated successfully'
    });
});

// Supprimer une tâche
exports.deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
    });
});

// Ajouter une sous-tâche à une tâche
exports.addSubTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { title, description } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const subTask = { title, description };
    task.subTasks.push(subTask);
    await task.save();

    res.status(201).json({
        success: true,
        data: task,
        message: 'SubTask added successfully'
    });
});

// Mettre à jour une sous-tâche
exports.updateSubTask = asyncHandler(async (req, res) => {
    const { taskId, subTaskId } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: taskId, 'subTasks._id': subTaskId },
        { $set: { 'subTasks.$.title': title, 'subTasks.$.description': description, 'subTasks.$.completed': completed } },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({ success: false, message: 'Task or SubTask not found' });
    }

    res.status(200).json({
        success: true,
        data: task,
        message: 'SubTask updated successfully'
    });
});

// Supprimer une sous-tâche
exports.deleteSubTask = asyncHandler(async (req, res) => {
    const { taskId, subTaskId } = req.params;

    const task = await Task.findByIdAndUpdate(
        taskId,
        { $pull: { subTasks: { _id: subTaskId } } },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({ success: false, message: 'Task or SubTask not found' });
    }

    res.status(200).json({
        success: true,
        data: task,
        message: 'SubTask deleted successfully'
    });
});

// Ajouter un commentaire à une tâche
exports.addComment = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { text, user } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const comment = { text, user };
    task.comments.push(comment);
    await task.save();

    res.status(201).json({
        success: true,
        data: task,
        message: 'Comment added successfully'
    });
});
