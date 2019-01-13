require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.API_KEY;

let searchResults = [];

module.exports = {
    searchAdoptable: (req, res) => {
        console.log(req.query);
        // let search = req.query.search.replace(' ', '%20')
        // axios.get(`http://www.giantbomb.com/api/search?api_key=${apiKey}&format=json&query=${search}&resources=game`)
        // .then( (response) => {
        //     response.data.results.forEach(result => {
        //     let game = {title: result.name,
        //     id: result.id,
        //     guid: result.guid,
        //     img: result.image.original_url,
        //     description: result.description,
        //     notes: '',
        //     queue: true}
        //     searchResults.push(animal);
        //     })
        //     res.status(200).json(searchResults);
        // })
        // .then(searchResults = [])
        // .catch(err => console.log(err));
    }
};
