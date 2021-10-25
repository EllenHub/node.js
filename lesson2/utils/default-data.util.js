const {DEFAULT_ADMIN_PASSWORD } = require('../configs/configs');
const {ADMIN} = require('../consts/user-roles.enum');
const {User} = require('../db');

module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
        await User.createUserWithHashedPassword({
            name: 'Ellen',
            email: 'ellen@gmail.com',
            password: DEFAULT_ADMIN_PASSWORD,
            role: ADMIN
        });
    }
};

