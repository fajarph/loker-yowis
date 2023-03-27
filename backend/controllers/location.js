const { Location } = require('../models')

const getLocations = async(req, res) => {
    try {
        const response = await Location.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createLocation = async(req, res) => {
    try {
        await Location.create(req.body);
        res.status(201).json({msg: "Location Created"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getLocations,
    createLocation
}