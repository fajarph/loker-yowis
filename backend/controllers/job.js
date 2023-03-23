const {Job} = require('../models')
const { Op } = require('sequelize')

const getJobs = async(req, res) => {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search_query || ""
    const offset = limit * page
    const totalRows = await Job.count({
        where:{
            [Op.or]: [{companyName:{
                [Op.like]: '%'+search+'%'
            }}, {companyAddress:{
                [Op.like]: '%'+search+'%'
            }}, {jobRole:{
                [Op.like]: '%'+search+'%'
            }}, {jobLevel:{
                [Op.like]: '%'+search+'%'
            }}, {jobType:{
                [Op.like]: '%'+search+'%'
            }}, {education:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    })
    const totalPage = Math.ceil(totalRows / limit)
    const result = await Job.findAll({
        where:{
            [Op.or]: [{companyName:{
                [Op.like]: '%'+search+'%'
            }}, {companyAddress:{
                [Op.like]: '%'+search+'%'
            }}, {jobRole:{
                [Op.like]: '%'+search+'%'
            }}, {jobLevel:{
                [Op.like]: '%'+search+'%'
            }}, {jobType:{
                [Op.like]: '%'+search+'%'
            }}, {education:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    })
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    })
}

const getJobById = async(req, res) => {
    try {
        const response = await Job.findOne({
            attributes:["companyName", "companyAddress", "salary", "jobRole", "jobLevel", "jobType", "jobShortDescription", "jobLongDescription", "education", "industry"],
            where:{
                uuid: req.params.id
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
                uuid: req.params.id
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
                uuid: req.params.id
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