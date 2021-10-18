const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, statusMessage } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusMessage.isNotValid, statusCodes.isNotValid);
        }
    }
};
