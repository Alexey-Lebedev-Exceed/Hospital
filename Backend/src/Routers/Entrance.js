const express = require('express');
const router = express.Router();
const controllerEntrance = require('../Controllers/Entrance')

//http://localhost:7000/entrance/login
router.post('/login', controllerEntrance.login)

//http://localhost:7000/entrance/register
router.post('/register', controllerEntrance.register)

module.exports = router;