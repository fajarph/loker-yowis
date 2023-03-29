const { Province } = require('../models')

const getProvinces = async(req, res) => {
    try {
        const response = await Province.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createProvince = async(req, res) => {
    try {
        await Province.create(req.body);
        res.status(201).json({msg: "Province Created"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getProvinces,
    createProvince
}