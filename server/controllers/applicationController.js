module.exports = {
    createApp: (req, res) => {
        console.log(req.body);
        const { app } = req.body;
        req.app
            .get("db")
            .application.create_application(req.session.user.id, app)
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
    },
    addAnimalApp: (req, res) => {
        const { animal_id, org_id } = req.body;
        req.app
            .get("db")
            .application.submit_animal_application(
                animal_id,
                req.session.user.id,
                org_id
            )
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },
    animalAppPending: (req, res) => {
        const { animal_id, user_id } = req.body;
        req.app
            .get("db")
            .application.org_accept_animal_application(animal_id, user_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },
    removeAnimalApp: (req, res) => {
        const { animal_id, user_id } = req.body;
        req.app
            .get("db")
            .application.remove_animal_application(animal_id, user_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    acceptAnimal: (req, res) => {
        const { animal_id } = req.body;
        req.app
            .get("db")
            .application.user_accept_animal(animal_id, req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getOrgAnimalApps: (req, res) => {
        req.app
            .get("db")
            .application.get_animal_applications(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getAppCount: (req, res) => {
        console.log(req.session.user);
        req.app
            .get("db")
            .application.get_application_count(req.session.user.id)
            .then(response => {
                console.log(response);
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getAnimalAppCount: (req, res) => {
        req.app
            .get("db")
            .application.get_animal_application_count(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
