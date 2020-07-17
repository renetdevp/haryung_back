const { db: { userModel } } = require('../const');

module.exports.postValidator = (data) => {

};

module.exports.userValidator = (id, pw, nickname) => {
    if (!id || !pw || !nickname) return false;

    const data = [{
        length: id.length,
        maxLength: userModel.id.maxlength,
    }, {
        length: nickname.length,
        maxLength: userModel.nickname.maxlength
    }];

    for (e in data){
        const { length, maxLength } = data[e];
        
        if (length > maxLength) return false;
    }

    return true;
};