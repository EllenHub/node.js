const User = require('../db/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error('This email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }

    }
};
