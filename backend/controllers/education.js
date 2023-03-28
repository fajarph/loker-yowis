const { Educations } = require('../models')

const getEducations = async(req, res) => {
    try {
        const response = await Educations.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createEducation = async(req, res) => {
    try {
        await Educations.create(req.body);
        res.status(201).json({msg: "Education Created"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getEducations,
    createEducation
}