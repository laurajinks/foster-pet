module.exports = {
    createApp: (req, res) => {
        // console.log(req.body);
        const { id, app } = req.body;
        req.app
            .get("db")
            .application.create_application(id, app)
            .then(() => {
                res.status(200);
            })
            .catch(err => console.log(err));
    },

    getApp: (req, res) => {
        req.app
            .get("db")
            .application.get_application(req.body.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    submitApp: (req, res) => {
        console.log(req.body);
        const { org_id, user_id, string } = req.body;
        req.app
            .get("db")
            .application.submit_application(org_id, user_id, string)
            .then(() => res.status(200))
            .catch(err => console.log(err));
    },

    getAppStatus: (req, res) => {
        // console.log(req.body);
        const { user_id, org_id } = req.body;
        req.app
            .get("db")
            .application.get_app_status(user_id, org_id)
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    deleteApp: (req, res) => {
        req.app
            .get("db")
            .application.delete_app(req.params.id)
            .then(() => res.status(200))
            .catch(err => console.log(err));
    },

    getApps: (req, res) => {
        req.app
            .get("db")
            .application.get_applications(req.session.user.id)
            .then(response => {
                console.log(response);
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
