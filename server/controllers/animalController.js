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

    getEligibleAnimals: (req, res) => {
        req.app
            .get("db")
            .animal.get_animals_member_orgs(req.session.user.id)
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
    },

    addFosterParent: (req, res) => {
        const { animal_id } = req.body;
        req.app
            .get("db")
            .animal.add_foster_parent(req.session.user.id, animal_id)
            .then(() => {
                res.status(200);
            })
            .catch(err => console.log(err));
    },

    removeFosterParent: (req, res) => {
        const { id } = req.body;
        req.app
            .get("db")
            .animal.remove_foster_parent(id)
            .then(() => {
                res.status(200);
            })
            .catch(err => console.log(err));
    }
};
