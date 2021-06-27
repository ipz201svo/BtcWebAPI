const router = require('express').Router();
const utils = require('../lib/utils');
const domain = require('../lib/domain');
const User = require('../models/User');

router.post('/login', function (req, res, next) {
    if (!utils.validateEmail(req.body.email)) {
        return res.json({ success: false, msg: 'Not valid email' });
    }

    const user = domain.findUser('email', req.body.email);

    if (!user) {
        return res.status(401).json({ success: false, msg: "Email or Password is incorrect" });
    }

    if (utils.validPassword(req.body.password, user.hash, user.salt)) {

        const tokenObject = utils.issueJWT(user);

        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

    } else {

        res.status(401).json({ success: false, msg: "Email or Password is incorrect" });

    }
});

router.post('/create', function (req, res, next) {
    if (!utils.validateEmail(req.body.email)) {
        return res.json({ success: false, msg: 'Not valid email' });
    }

    if (domain.findUser("email", req.body.email)) {
        return res.json({ success: false, msg: 'Email is already taken' });
    }


    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User(req.body.email, hash, salt);
    newUser.id = Date.now();

    try {
        domain.addUser(newUser);
        res.json({ success: true, user: newUser });

    } catch (err) {
        res.json({ success: false, msg: err });
    }

});

module.exports = router;