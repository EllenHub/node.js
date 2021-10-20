const O_Auth = require('../db/O_Auth');
const { LOGIN } = require('../consts/email-actions.enum');
const { emailService } = require('../services');
const { jwtService } = require('../services');

module.exports = {
    userLogination: async (req, res, next) => {
        try {
            const {user} = req;
            const {email, name} = req.body;

            const tokenPair = jwtService.generatePairToken();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            await emailService.sendMail(email, LOGIN,{userName: name});

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
            const { token } = req;

            await O_Auth.deleteOne({token});

            res.json('User has logged out');
        } catch (e) {
            next(e);
        }
    }
};
