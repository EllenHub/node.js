const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL } = require('../configs/configs');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, statusMessage } = require('../configs');


const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shirpalalona@gmail.com',
        pass: 'Shirpal1990'
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {

    const templateInfo = allTemplates[emailAction];

    if(!templateInfo) {
        throw new ErrorHandler(statusMessage.wrongTemplate, statusCodes.serverError);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};

