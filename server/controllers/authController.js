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
    },

    logInUser: (req, res) => {
        const { username, password } = req.body;
        req.app
            .get("db")
            .get_user(username)
            .then(response => {
                const foundUser = response;
                const user = foundUser[0];
                if (!user) {
                    res.status(401).json({
                        error: "Incorrect username"
                    });
                } else {
                    bcrypt.compare(password, user.auth_id).then(response => {
                        const isAuthenticated = response;

                        if (!isAuthenticated) {
                            res.status(403).json({
                                error: "Incorrect password"
                            });
                        } else {
                            req.session.user = {
                                id: user.user_id,
                                username: user.username
                            };
                            res.status(200).json(req.session.user);
                        }
                    });
                }
            });
    },

    logInOrg: (req, res) => {
        const { username, password } = req.body;
        req.app
            .get("db")
            .get_org(username)
            .then(response => {
                const foundOrg = response;
                const user = foundOrg[0];
                if (!user) {
                    res.status(401).json({
                        error: "Incorrect username"
                    });
                } else {
                    bcrypt.compare(password, user.auth_id).then(response => {
                        const isAuthenticated = response;

                        if (!isAuthenticated) {
                            res.status(403).json({
                                error: "Incorrect password"
                            });
                        } else {
                            req.session.user = {
                                d: user.org_id,
                                username: user.username
                            };
                            res.status(200).json(req.session.user);
                        }
                    });
                }
            });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.status(200).json("okay");
    }
};
