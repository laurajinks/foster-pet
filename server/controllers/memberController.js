module.exports = {
    getMemberStatus: (req, res) => {
        const { user_id, org_id } = req.body;
        req.app
            .get("db")
            .member.get_member_status(user_id, org_id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    addMembership: (req, res) => {
        const { user_id, org_id } = req.body;
        req.app
            .get("db")
            .member.add_membership(user_id, org_id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getCurrentFosters: (req, res) => {
        if (req.session.user) {
            req.app
                .get("db")
                .member.get_current_fosters(req.session.user.id)
                .then(response => res.status(200).json(response))
                .catch(err => console.log(err));
        } else {
            res.status(401);
        }
    },

    deleteFoster: (req, res) => {
        req.app
            .get("db")
            .member.remove_foster(req.session.user.id, req.params.id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    }
};
