const express = require('express');
const router = express.Router();
const managers = require('../controllers/managers');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', managers.getAll);
router.get('/:id', managers.getSingle);

router.post('/', isAuthenticated, managers.createManager);
router.put('/:id', isAuthenticated, managers.updateManager);
router.delete('/:id', isAuthenticated, managers.deleteManager);

module.exports = router;