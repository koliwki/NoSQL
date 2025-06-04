// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const secretKey = process.env.JWT_SECRET || 'secret';

exports.inscription = async (req, res) => {
    try {
        const { nom, email, motDePasse } = req.body;
        const utilisateurExistant = await User.findOne({ email });
        if (utilisateurExistant) return res.status(400).json({ message: 'Email déjà utilisé' });

        const hash = await bcrypt.hash(motDePasse, 10);
        const nouvelUtilisateur = new User({ nom, email, motDePasse: hash });
        await nouvelUtilisateur.save();
        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.connexion = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;
        const utilisateur = await User.findOne({ email });
        if (!utilisateur) return res.status(400).json({ message: 'Email invalide' });

        const valide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!valide) return res.status(400).json({ message: 'Mot de passe invalide' });

        const token = jwt.sign({ id: utilisateur._id }, secretKey, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.moi = async (req, res) => {
    try {
        const utilisateur = await User.findById(req.userId).select('-motDePasse');
        res.json(utilisateur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
