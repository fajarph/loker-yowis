const {Job} = require('../models')

const getJobs = async(req, res) => {
    try {
        const response = await Job.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getJobById = async(req, res) => {
    try {
        const response = await Job.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createJob = async(req, res) => {
    try {
        await Job.create(req.body);
        res.status(201).json({msg: "Job Created"});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateJob = async(req, res) => {
    try {
        await Job.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Job Updated"});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const deleteJob = async(req, res) => {
    try {
        await Job.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Job Deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}