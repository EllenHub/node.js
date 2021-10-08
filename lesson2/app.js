const express = require('express');
const mongoose = require('mongoose');

const {PORT, MONGO_CONNECT_URL} = require('./configs/configs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const { authRouter, userRouter } = require('./routes/index');

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT,() => {
    console.log('App listens to', PORT);
});

