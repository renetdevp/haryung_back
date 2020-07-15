const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        default: '',
    }
}, {
    versionKey: false
});

module.exports = model('Post', postSchema);