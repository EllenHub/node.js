
module.exports = {
    userLogination: (req, res) => {
        try {
            res.json(req.user);
        } catch (er) {
            res.json(er.message);
        }
    }
};
