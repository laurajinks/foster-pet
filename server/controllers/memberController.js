module.exports = {
    getMemberStatus: (req, res) => {
        const { user_id, org_id } = req.body;
        req.app
            .get("db")
            .member.get_member_status(user_id, org_id)
            .then(response => {
                if (response) {
                    return res.status(200).json("true");
                } else if (!response) {
                    return res.status(200).json("false");
                }
            })
            .catch(err => console.log(err));
    },

    addMembership: (req, res) => {
        const { user_id, org_id } = req.body;
        req.app
            .get("db")
            .member.add_membership(user_id, org_id)
            .then(() => res.status(200))
            .catch(err => console.log(err));
    }
};
