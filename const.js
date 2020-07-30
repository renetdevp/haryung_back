module.exports = {
    db: {
        host: process.env.DB_HOST,
        id: process.env.DB_ID,
        pw: process.env.DB_PW,
        userModel: {
            id: { maxlength: 24 },
            nickname: { maxlength: 24 }
        },
    },
    port: process.env.PORT,
    saltRounds: 13,
};
