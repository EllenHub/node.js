const O_Auth = require('../db/O_Auth');
const { jwtService } = require('../services');

module.exports = {
    userLogination: async (req, res, next) => {
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
