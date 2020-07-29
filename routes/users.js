const router = require('express').Router();

const User = require('../models/user');
const { userValidator } = require('../utils/validator');

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

        await User.create({
            id,
            pw,
            nickname
        });

        return res.status(200).json({
            msg: `User ${id} created`
        });
    } catch (err){
        next(err);
    }

});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ id: req.params.id });

        if (!user) return res.status(404).json({ msg: 'User not found :(' });

        user.verifyPW('a');
        res.end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
