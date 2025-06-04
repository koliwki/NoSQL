const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/inscription', userController.inscription);
router.post('/connexion', userController.connexion);
router.get('/moi', require('../middleware/auth'), userController.moi);

module.exports = router;
