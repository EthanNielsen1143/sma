const express = require('express');
const router = express.Router();
const workers = require('../controllers/workers');
// const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', workers.getAll);
router.get('/:id', workers.getSingle);

router.post('/', workers.createWorker);
router.put('/:id', workers.updateWorker);
router.delete('/:id', workers.deleteWorker);

// router.post('/', isAuthenticated, workers.createworker);
// router.put('/:id', isAuthenticated, workers.updateworker);
// router.delete('/:id', isAuthenticated, workers.deleteworker);

module.exports = router;