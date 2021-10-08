const User = require('../db/User');

module.exports = {
    isEmailValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userByEmail = await User.findOne({email});

            if(!userByEmail) {
                throw new Error('User does not exist');
            }

            if(userByEmail.password !== password) {
                throw new Error('User does not exist');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
