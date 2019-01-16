module.exports = {
    writePost: (req, res) => {
        const { title, content } = req.body;
        req.app
            .get("db")
            .blog.add_post(req.session.user.id, title, content)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getPosts: (req, res) => {
        req.app
            .get("db")
            .blog.get_posts(req.session.user.id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getMemberPosts: (req, res) => {
        req.app
            .get("db")
            .blog.get_member_posts(req.session.user.id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    }
};
