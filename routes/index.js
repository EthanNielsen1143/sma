const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags = ['Hello']
    res.send('Hello World!');
  });

module.exports = router;