require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.API_KEY;

let searchResults = [];

module.exports = {
    searchAdoptable: (req, res) => {
        let zipcode = req.query.zipcode;
        let animal = req.query.animal;
        let age = req.query.age;
        let sex = req.query.sex;
        axios
            .get(
                `http://api.petfinder.com/pet.find?format=json&key=${apiKey}&output=full&location=${zipcode}&animal=${animal}&age=${age}&gender=${sex}`
            )
            .then(response => {
                response.data.petfinder.pets.pet.forEach(result => {
                    let animal = {
                        name: result.name.$t,
                        id: result.id.$t,
                        img: result.media.photos.photo[2].$t,
                        size: result.size.$t,
                        age: result.age.$t,
                        breed: result.breeds.breed.$t,
                        description: result.description.$t,
                        animalType: result.animal.$t,
                        shelterId: result.shelterId.$t,
                        usState: result.contact.state.$t,
                        city: result.contact.city.$t
                    };
                    searchResults.push(animal);
                });
                res.status(200).json(searchResults);
            })
            .then((searchResults = []))
            .catch(err => console.log(err));
    },

    getShelterInfo: (req, res) => {
        const { shelterId } = req.body;
        axios
            .get(
                `http://api.petfinder.com/shelter.get?format=json&key=${apiKey}&id=${shelterId}`
            )
            .then(response => {
                console.log(response.data);
                let shelterName = response.data.petfinder.shelter.name.$t;
                res.status(200).json(shelterName);
            })
            .catch(err => console.log(err));
    },

    getOrgs: (req, res) => {
        const { usState } = req.body;
        req.app
            .get("db")
            .search.get_orgs(usState)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getUser: (req, res) => {
        req.app
            .get("db")
            .search.get_user(req.body.id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getOrgData: (req, res) => {
        req.app
            .get("db")
            .search.get_org_data(req.body.id)
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    }
};
