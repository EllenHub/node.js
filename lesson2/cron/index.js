const cron = require('node-cron');
const removeOldTokens = require('../cron/remove-expired-tokens-job');

module.exports = () => {
    cron.schedule('0 2 * * 0',() => {
      removeOldTokens();
    });
};
