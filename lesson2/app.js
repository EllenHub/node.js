const express = require('express');

const userRouter = require('./routes/user.router');
const {PORT} = require('./config/variabes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

app.listen(PORT,() => {
    console.log('App listens to', PORT);
});

