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
    }
};
