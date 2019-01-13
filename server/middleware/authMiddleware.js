module.exports = {
    usersOnly: (req, res, next) => {
        // console.log(req);
        console.log(`username ${req.session.user.username}`);
        if (req.session.user.isOrg) {
            res.status(401).json(
                "You do not have permission to view this page"
            );
        } else {
            next();
        }
    },

    orgOnly: (req, res, next) => {
        if (!req.session.user.isOrg) {
            res.status(401).json(
                "You do not have permission to view this page"
            );
        } else {
            next();
        }
    }
};
