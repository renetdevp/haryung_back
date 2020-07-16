const router = require('express').Router();

const User = require('../models/user');
const { userValidator } = require('../utils/validator');

router.post('/', async (req, res, next) => {
    const { id, pw, nickname } = req.body;
    const nick = !!nickname ? nickname : 'asdf';

    if(!userValidator(id, pw, nick)){
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
            nickname: nick
        });

        return res.status(200).json({
            msg: `User ${id} created`
        });
    } catch (err){
        next(err);
    }

});

module.exports = router;