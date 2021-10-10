module.exports = {
    userLogination: (req, res) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (er) {
            res.json(er.message);
        }
    },
};
