module.exports = {
    addAnimal: (req, res) => {
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
            .add_animal(
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
            .get_org_animals(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getUserAnimals: (req, res) => {
        req.app
            .get("db")
            .get_user_animals(req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
