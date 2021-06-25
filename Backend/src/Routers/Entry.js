const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllerEntry = require('../Controllers/Entry');

//http://localhost:7000/entry
router.get('/', passport.authenticate('jwt', {session: false}), controllerEntry.entry)

//http://localhost:7000/entry/:id
// router.get('/:id', controllerEntry.everyEntry)

//http://localhost:7000/entry/:id
router.delete('/:id', controllerEntry.removeEntry)

//http://localhost:7000/entry
router.post('/', controllerEntry.addEntry)

//http://localhost:7000/entry/:id
router.patch('/:id', controllerEntry.changeEntry)

module.exports = router;