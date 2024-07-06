const express = require('express');
const router = express.Router();
const temples = require('../controllers/temples');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', temples.getAll);
router.get('/:id', temples.getSingle);

router.post('/', isAuthenticated, temples.createTemple);
router.put('/:id', isAuthenticated, temples.updateTemple);
router.delete('/:id', isAuthenticated, temples.deleteTemple);

module.exports = router;