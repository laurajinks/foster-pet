module.exports = {
    usersOnly: (req, res, next) => {
        if (!req.session.user) {
            res.status(401).json("Please log in");
        } else if (req.session.user.isOrg) {
            res.status(401).json(
                "You do not have permission to view this page"
            );
        } else {
            next();
        }
    },

    orgOnly: (req, res, next) => {
        if (!req.session.user) {
            res.status(401).json("Please log in");
        } else if (!req.session.user.isOrg) {
            res.status(401).json(
                "You do not have permission to view this page"
            );
        } else {
            next();
        }
    }
};
