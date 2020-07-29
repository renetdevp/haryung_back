const { Schema, model } = require('mongoose');

const { db: { userModel } } = require('../const');
const idMaxLength = userModel.id.maxlength;
const nickMaxLength = userModel.nickname.maxlength;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        maxlength: idMaxLength,
    },
    pw: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        maxlength: nickMaxLength,
        default: 'asdf',
    }
}, {
    versionKey: false
});

userSchema.methods.verifyPW = function (pw) {
    console.log('hihi');
}

module.exports = model('User', userSchema);;
