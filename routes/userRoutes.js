const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/todoController');

router.get('/user', getAllUsers);

module.exports = router;
