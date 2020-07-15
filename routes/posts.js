const router = require('express').Router();
const { isValidObjectId } = require('mongoose');

const Post = require('../models/post');

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find({}, {
            _id: 1,
            title: 1
        });

        res.status(200).json({
            posts
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const { title, content } = req.body;

    try {
        Post.create({
            title,
            content
        });

        res.status(200).json({
            msg: `Post ${title} created`
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) return res.status(400).json({ msg: 'Invalid post id' });

        const post = await Post.findOne({ _id: id });
        
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        res.status(200).json({
            post
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;