const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/configs');
const { tokenTypeEnum } = require('../consts');
const { statusCodes, statusMessage } = require('../configs');

module.exports = {
    generatePairToken: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusMessage.invalidToken, statusCodes.invalidToken);
        }
    }
};
