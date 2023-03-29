const { Role } = require('../models')

const getRoles = async(req, res) => {
    try {
        const response = await Role.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createRole = async(req, res) => {
    try {
        await Role.create(req.body);
        res.status(201).json({msg: "Role Created"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getRoles,
    createRole
}