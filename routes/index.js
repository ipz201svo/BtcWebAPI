const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/btcRate', require('./btcRate'));

module.exports = router;