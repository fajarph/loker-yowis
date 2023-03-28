const { Category } = require('../models')

const getCategories = async(req, res) => {
    try {
        const response = await Category.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createCategory = async(req, res) => {
    try {
        await Category.create(req.body);
        res.status(201).json({msg: "Category Created"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getCategories,
    createCategory
}