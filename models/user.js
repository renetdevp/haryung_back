const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        maxlength: 12,
    },
    pw: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        maxlength: 12,
        default: '익명',
    }
}, {
    versionKey: false
});

module.exports = model('User', userSchema);