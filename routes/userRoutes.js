const express = require('express');
const { getUserById } = require('../controller/userController');
const router = express.Router();

router.get('/user', getUserById);
module.exports = router;