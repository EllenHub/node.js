const nodemailer = require('nodemailer');

const {N0_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../configs/configs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: N0_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = (userMail) => transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject: 'hello world',
    html: 'hey you'
});

module.exports = {
    sendMail
};

