const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/btcRate', require('./btcRate'));

module.exports = router;