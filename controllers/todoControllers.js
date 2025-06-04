const asyncHandler = require('express-async-handler');
const Task = require('../models/models').Task; // Assurez-vous que le modèle est correctement importé

// Créer une tâche
exports.createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, tags, userId } = req.body;
    const task = await Task.create({ title, description, dueDate, tags, userId });

    res.status(201).json({
        success: true,
        data: task,
        message: 'Tâche créée avec succès'
    });
});

// Obtenir toutes les tâches d'un utilisateur
exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
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
        return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
    }

    res.status(200).json({
        success: true,
        data: task,
        message: 'Tâche mise à jour avec succès'
    });
});

// Supprimer une tâche
exports.deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
    }

    res.status(200).json({
        success: true,
        message: 'Tâche supprimée avec succès'
    });
});

// Ajouter une sous-tâche à une tâche
exports.addSubTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { title, status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }

    const subTask = { title, status };
    task.subTasks.push(subTask);
    await task.save();

    res.status(201).json({
        success: true,
        data: task,
        message: 'Sous-tâche ajoutée avec succès'
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
        return res.status(404).json({ success: false, message: 'Tâche ou sous-tâche non trouvée' });
    }

    res.status(200).json({
        success: true,
        data: task,
        message: 'Sous-tâche mise à jour avec succès'
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
        return res.status(404).json({ success: false, message: 'Tâche ou sous-tâche non trouvée' });
    }

    res.status(200).json({
        success: true,
        data: task,
        message: 'Sous-tâche supprimée avec succès'
    });
});

// Ajouter un commentaire à une tâche
exports.addComment = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { text, user } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }

    const comment = { text, user };
    task.comments.push(comment);
    await task.save();

    res.status(201).json({
        success: true,
        data: task,
        message: 'Commentaire ajouté avec succès'
    });
});
