const bcrypt = require("bcryptjs");

module.exports = {
    addUser: async (req, res) => {
        const { username, displayName, password, email } = req.body;
        const hash = await bcrypt.hash(password, 10);
        req.app
            .get("db")
            .add_user(username, displayName, hash, email)
            .then(response => {
                const user = response[0];
                req.session.user = {
                    id: user.user_id,
                    username: user.username
                };
                res.status(201).json(user);
            })
            .catch(err => console.log(err));
    },

    addOrg: async (req, res) => {
        const { username, orgName, password, email, zipcode } = req.body;
        const hash = await bcrypt.hash(password, 10);
        req.app
            .get("db")
            .add_organization(username, orgName, hash, email, zipcode)
            .then(response => {
                const user = response[0];
                req.session.user = {
                    id: user.org_id,
                    username: user.username
                };
                res.status(201).json(user);
            });
    }
};
