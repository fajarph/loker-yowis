const { Level } = require('../models')

const getLevels = async(req, res) => {
    try {
        const response = await Level.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createLevel = async(req, res) => {
    try {
        await Level.create(req.body);
        res.status(201).json({msg: "Level Created"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getLevels,
    createLevel
}