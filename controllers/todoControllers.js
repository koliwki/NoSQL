const asyncHandler = require('express-async-handler');
const Task = require('../models/models').Tache;

// Cr�er une t�che
exports.createTask = asyncHandler(async (req, res) => {
    const { titre, description, dateEcheance, etiquettes, utilisateurId } = req.body;
    const task = await Task.create({ titre, description, dateEcheance, etiquettes, utilisateurId });

    res.status(201).json({
        success: true,
        data: task,
        message: 'Tâche créée avec succès'
    });
});

// Obtenir toutes les t�ches d'un utilisateur
exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({
        success: true,
        data: tasks
    });
});

// Mettre � jour une t�che
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

// Supprimer une t�che
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

// Ajouter une sous-t�che � une t�che
exports.addSubTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { titre, statut } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }

    const subTask = { titre, statut };
    task.sousTaches.push(subTask);
    await task.save();

    res.status(201).json({
        success: true,
        data: task,
        message: 'Sous-tâche ajoutée avec succès'
    });
});

// Mettre � jour une sous-t�che
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

// Supprimer une sous-t�che
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

// Ajouter un commentaire � une t�che
exports.addComment = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { texte, user } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }

    const comment = { texte, user };
    task.commentaires.push(comment);
    await task.save();

    res.status(201).json({
        success: true,
        data: task,
        message: 'Commentaire ajouté avec succès'
    });
});
