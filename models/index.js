const mongoose = require('mongoose');
const { db: { host, id, pw } } = require('../const');
const encodedPw = encodeURIComponent(pw);

const hos = ()=>{
    const run = async ()=>{
        try {
            const db_url = `mongodb://${id}:${encodedPw}@${host}/admin`;
            await mongoose.connect(db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'haryung'
            });
        }catch (err){
            if (err){
                console.error(`DB connect error\n%${err}`);
                process.exit(101);
            }
        }

        console.log('DB on');
    }

    run();

    mongoose.connection.on('error', (err)=>{
        console.error(`DB error\n%{err}`);
    });

    mongoose.connection.on('disconnected', (err)=>{
        console.error(`DB disconnected\n${err}`);
        process.exit(102);
    });

    require('./post');
};

module.exports = hos;