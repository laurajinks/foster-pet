module.exports = {
    addAnimal: (req, res) => {
        // console.log(req.body);
        const {
            org_id,
            name,
            animalType,
            age,
            sex,
            breed,
            size,
            description,
            url
        } = req.body;
        req.app
            .get("db")
            .animal.add_animal(
                org_id,
                name,
                animalType,
                age,
                sex,
                breed,
                size,
                description,
                url
            )
            .then(response => {
                res.status(200);
            })
            .catch(err => console.log(err));
    },

    getOrgAnimals: (req, res) => {
        req.app
            .get("db")
            .animal.get_org_animals(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getUserAnimals: (req, res) => {
        req.app
            .get("db")
            .animal.get_user_animals(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    removeAnimal: (req, res) => {
        req.app
            .get("db")
            .animal.remove_animal(req.params.id)
            .then(response => {
                res.status(200);
            })
            .catch(err => console.log(err));
    }
};
