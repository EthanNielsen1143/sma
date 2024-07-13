const express = require('express');
const router = express.Router();
const spills = require('../controllers/spills');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', spills.getAll);
router.get('/:id', spills.getSingle);

router.post('/', isAuthenticated, spills.createspill);
router.put('/:id', isAuthenticated, spills.updatespill);
router.delete('/:id', isAuthenticated, spills.deletespill);

module.exports = router;