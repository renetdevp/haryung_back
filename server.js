require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');
const { port } = require('./const');

app.listen(port, ()=>{
    console.log(`Server on at ${new Date()}`);
});

process.on('exit', ()=>{
    mongoose.connection.close();
});