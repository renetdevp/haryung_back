const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hpp = require('hpp');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const run = require('./models');
const posts = require('./routes/posts');
const users = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(hpp());
app.use(helmet());
app.use(logger('common'));

run();

app.use('/posts', posts);
app.use('/users', users);

app.head('/status', (req, res, next)=>{
    res.status(200).json({
        msg: 'Server all green :)'
    });
});

app.get('/status', (req, res, next)=>{
    res.status(200).json({
        msg: 'Server all green :)'
    });
});

app.use((err, req, res, next)=>{
    console.error(`Error: ${err}`);

    res.status(500).json({
        msg: 'Interval server error'
    });
});

app.use((req, res, next)=>{
    res.status(404).json({
        msg: 'Sorry, Not found :('
    });
});

module.exports = app;