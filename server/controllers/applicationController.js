module.exports = {
    createApp: (req, res) => {
        const { id, app } = req.body;
        req.app
            .get("db")
            .application.create_application(id, app)
            .then(response => res.status(200).json(response))
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
        const { org_id, user_id, string } = req.body;
        req.app
            .get("db")
            .application.submit_application(org_id, user_id, string)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getAppStatus: (req, res) => {
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
            .application.delete_application(req.params.id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getApps: (req, res) => {
        req.app
            .get("db")
            .application.get_applications(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
