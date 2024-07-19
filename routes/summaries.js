const express = require('express');
const router = express.Router();
const summaries = require('../controllers/summaries');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', summaries.getAll);
router.get('/:id', summaries.getSingle);

router.post('/', isAuthenticated, summaries.createSummary);
router.put('/:id', isAuthenticated, summaries.updateSummary);
router.delete('/:id', isAuthenticated, summaries.deleteSummary);

module.exports = router;