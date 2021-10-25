const {ActionToken, O_Auth, User} = require('../db');
const ActionTokenTypeEnum = require('../consts/action-token-type.enum');
const ErrorHandler = require('../errors/ErrorHandler');
const EmailActionEnum = require('../consts/email-actions.enum');
const {userNormalizator} = require('../utils/user.util');
const {statusMessage, statusCodes} = require('../configs');
const {LOGIN, RESET_NEW_PASSWORD} = require('../consts/email-actions.enum');
const {jwtService, emailService, passwordService} = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;
            const {email, name} = req.body;

            const tokenPair = jwtService.generatePairToken();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            await emailService.sendMail(email, LOGIN, {userName: name});

            res.json({
                user,
                ...tokenPair,
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {token} = req;

            await O_Auth.deleteOne({token});

            res.json('User has logged out');
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generatePairToken();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair,
            });
        } catch (e) {
            next(e);
        }
    },
    forgotPasswordEmail: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(statusMessage.notFound, statusCodes.notFound);
            }
            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}`});

            res.json({actionToken});
        } catch (e) {
            next(e);
        }
    },
    setNewPasswordAfterForgot: async (req, res, next) => {
        try {

            const { _id, email, name} = req.user;
            const {password} = req.body;
            
            const hashedPassword = await passwordService.hash(password);

            const userWithNewPassword = await User.findByIdAndUpdate(
                {_id},
                { $set: { password: hashedPassword } },
                {new: true}
            );
            await userNormalizator(userWithNewPassword);

            await emailService.sendMail(email, RESET_NEW_PASSWORD, {userName: name});

            res.json('Successful');
        } catch (e) {
            next(e);
        }
    }
};
