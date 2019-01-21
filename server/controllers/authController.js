const bcrypt = require("bcryptjs");

module.exports = {
    authAccount: (req, res) => {
        res.status(201).json(req.session.user);
    },

    addUser: async (req, res) => {
        const { username, displayName, password, email, url } = req.body;
        if (
            username === "animal" ||
            username === "users" ||
            username === "organization" ||
            username === "application" ||
            username === "post" ||
            username === "member" ||
            username === "game"
        ) {
            res.status(403).json("Invalid username");
        }
        const hash = await bcrypt.hash(password, 10);
        req.app
            .get("db")
            .auth.add_user(username, displayName, hash, email, url)
            .then(response => {
                const user = response[0];
                req.session.user = {
                    id: user.user_id,
                    username: user.username,
                    img: user.img,
                    email: user.email,
                    displayName: user.user_display_name,
                    isOrg: false
                };
                res.status(201).json(req.session.user);
            })
            .catch(err => console.log(err));
    },

    addOrg: async (req, res) => {
        const {
            username,
            orgName,
            password,
            email,
            zipcode,
            usState,
            url
        } = req.body;
        if (
            username === "animal" ||
            username === "users" ||
            username === "organization" ||
            username === "application" ||
            username === "post" ||
            username === "member" ||
            username === "game"
        ) {
            res.status(403).json("Invalid username");
        }
        const hash = await bcrypt.hash(password, 10);
        req.app
            .get("db")
            .auth.add_organization(
                username,
                orgName,
                hash,
                email,
                zipcode,
                usState,
                url
            )
            .then(response => {
                const user = response[0];
                req.session.user = {
                    id: user.org_id,
                    username: user.username,
                    displayName: user.org_display_name,
                    zipcode: user.zipcode,
                    usState: user.usState,
                    img: user.img,
                    isOrg: true
                };
                res.status(201).json(req.session.user);
            });
    },

    logInUser: (req, res) => {
        const { username, password } = req.body;
        req.app
            .get("db")
            .auth.get_user(username)
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
                                username: user.username,
                                img: user.img,
                                email: user.email,
                                displayName: user.user_display_name,
                                isOrg: false
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
            .auth.get_org(username)
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
                                id: user.org_id,
                                username: user.username,
                                displayName: user.org_display_name,
                                zipcode: user.zipcode,
                                usState: user.usState,
                                img: user.img,
                                isOrg: true
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
