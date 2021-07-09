const express = require('express');
const router = express.Router();
const checkToken = require('../Middleware/checkToken');
const controllerEntry = require('../Controllers/Entry');

//http://localhost:7000/entry
router.get('/', checkToken, controllerEntry.entry);

// http://localhost:7000/entry
// router.get('/', passport.authenticate('jwt', {session: false}), controllerEntry.allEntry)

//http://localhost:7000/entry/delete
router.delete('/delete', controllerEntry.removeEntry)

//http://localhost:7000/entry
router.post('/', checkToken, controllerEntry.addEntry)

//http://localhost:7000/entry/changeEntry
router.patch('/changeEntry', controllerEntry.changeEntry)

module.exports = router;