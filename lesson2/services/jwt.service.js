const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const {FORGOT_PASSWORD} = require('../consts/action-token-type.enum');
const {
    JWT_ACCESS_SECRET,
    JWT_ACTION_SECRET,
    JWT_REFRESH_SECRET
} = require('../configs/configs');
const {tokenTypeEnum} = require('../consts');
const {statusCodes, statusMessage} = require('../configs');

module.exports = {
    generatePairToken: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            let secret = '';
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case tokenTypeEnum.ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;
            }
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusMessage.invalidToken, statusCodes.invalidToken);
        }
    },
    generateActionToken: (actionTokenType) => {
        let secretWord;
        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_ACTION_SECRET;
                break;
            default:
                throw new ErrorHandler(statusMessage.wrongTokenType, statusCodes.serverError);

        }
        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    }
};
