const express = require('express');
const router = express.Router();
const spills = require('../controllers/spills');
// const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', spills.getAll);
router.get('/:id', spills.getSingle);

router.post('/', spills.createSpill);
router.put('/:id', spills.updateSpill);
router.delete('/:id', spills.deleteSpill);

// router.post('/', isAuthenticated, spills.createSpill);
// router.put('/:id', isAuthenticated, spills.updateSpill);
// router.delete('/:id', isAuthenticated, spills.deleteSpill);

module.exports = router;