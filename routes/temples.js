const express = require('express');
const router = express.Router();
const temples = require('../controllers/temples');

router.get('/', temples.getAll);
router.get('/:id', temples.getSingle);

router.post('/', temples.createTemple);
router.put('/:id', temples.updateTemple);
router.delete('/:id', temples.deleteTemple);

module.exports = router;