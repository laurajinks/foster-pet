module.exports = {
    createApp: (req, res) => {
        console.log(req.body);
        req.app
            .get("db")
            .create_application(req.body.id, req.body.application)
            .then(() => {
                res.status(200);
            })
            .catch(err => console.log(err));
    }
};
