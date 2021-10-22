const emailActionsEnum = require('../consts/email-actions.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },
    [emailActionsEnum.LOGIN]: {
        templateName: 'login',
        subject: 'Welcome back!'
    },
    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'Updated account'
    },
    [emailActionsEnum.DELETE]: {
        templateName: 'delete',
        subject: 'Deleted account'
    },
    [emailActionsEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot_password',
        subject: ' Reset Password'
    },
    [emailActionsEnum.RESET_NEW_PASSWORD]: {
        templateName: 'new_password',
        subject: 'New password is reset'
    },
};
