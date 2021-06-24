const router = require('express').Router();
const btc = require('../api/btc');
const passport = require('passport');

router.get('', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const btcData = await btc.getInfo();
    res.status(200).json({ success: true, btc_uah: btcData});
});

module.exports = router;