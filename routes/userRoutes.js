const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/inscription', userController.inscription);
router.post('/connexion', userController.connexion);

module.exports = router;
