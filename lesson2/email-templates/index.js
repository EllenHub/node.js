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

};
