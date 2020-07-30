const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');
const { userValidator } = require('../utils/validator');
const { saltRounds } = require('../const');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}, { id: 1, nickname: 1, _id: 0 });

        res.status(200).json({
            users
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const { id, pw, nick } = req.body;
    const nickname = !!nick ? nick : 'asdf';

    if(!userValidator(id, pw, nickname)){
        return res.status(400).json({
            msg: 'Invalid value'
        });
    }

    try {
        const isExist = await User.exists({ id });

        if (isExist) {
            return res.status(409).json({
                msg: `User ${id} already exist`
            });
        }

        const hash = await bcrypt.hash(pw, saltRounds);

        await User.create({
            id,
            pw: hash,
            nickname
        });

        return res.status(200).json({ msg: `User ${id} created` });
    } catch (err){
        next(err);
    }

});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ id: req.params.id });

        if (!user) return res.status(404).json({ msg: 'User not found :(' });

        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, reason) => {
        if (err) return next(err);
        if (reason) return res.status(400).json({ msg: reason.msg });

        return req.login(user, async (loginErr) => {
            if (err) return next(loginErr);
            const userInfo = await User.findOne({ id: user.id }, { _id: 0, pw: 0 });

            return res.status(200).json(userInfo);
        });
    })(req, res, next);
});

module.exports = router;
