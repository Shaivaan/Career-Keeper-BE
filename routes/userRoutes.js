const express = require('express');
const { getUserById } = require('../controller/userController');
const router = express.Router();

router.get('/', getUserById);
module.exports = router;