const mongoose = require('mongoose');

const sousTacheSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    titre: String,
    statut: { type: String, enum: ['en attente', 'complétée'], default: 'en attente' }
});

const commentaireSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    texte: String,
    date: { type: Date, default: Date.now }
});

const tacheSchema = new mongoose.Schema({
    titre: String,
    description: String,
    dateEcheance: Date,
    statut: { type: String, enum: ['en attente', 'complétée'], default: 'en attente' },
    utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    etiquettes: [String],
    sousTaches: [sousTacheSchema],
    commentaires: [commentaireSchema],
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const utilisateurSchema = new mongoose.Schema({
    nom: String,
    email: { type: String, unique: true },
    motDePasse: String
});

const Tache = mongoose.model('Tache', tacheSchema);
const User = mongoose.model('User', utilisateurSchema);

module.exports = { Tache, User };
