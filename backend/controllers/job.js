const {Job} = require('../models')
const path = require("path")
const fs = require("fs")
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
            attributes:["companyName", "companyAddress", "salary", "jobRole", "jobLevel", "jobType", "jobShortDescription", "jobLongDescription", "education", "industry", 'createdAt', "image", "url"],
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
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"})
    const companyName = req.body.companyName
    const companyAddress = req.body.companyAddress
    const salary = req.body.salary
    const jobRole = req.body.jobRole
    const jobLevel = req.body.jobLevel
    const jobType = req.body.jobType
    const jobShortDescription = req.body.jobShortDescription
    const jobLongDescription = req.body.jobLongDescription
    const education = req.body.education
    const industry = req.body.industry
    const file = req.files.file
    const fileSize = file.data.lenght
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/jobs/${fileName}`
    
    const allowedType = ['.png','.jpg','jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Ivalid Image"})
    if(fileSize > 5000000) return res.status(422).json({msg: "Image harus lebih kecil dari 5mb"})

    file.mv(`./public/jobs/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Job.create({
                companyName: companyName, 
                companyAddress: companyAddress, 
                salary: salary, 
                jobRole: jobRole,
                jobLevel: jobLevel,
                jobType: jobType,
                jobShortDescription: jobShortDescription,
                jobLongDescription: jobLongDescription,
                education: education,
                industry: industry,
                image: fileName, 
                url: url
            })
            res.status(201).json({msg: "Job Created Succesfully"})
        } catch (error) {
            console.log(error.message);
        }
    })
}

const updateJob = async(req, res) => {
    const job = await Job.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!job) return res.status(404).json({msg: "Job Tidak Ditemukan"});

    let fileName = "";
    let imageChanged = false; // variable untuk mengecek apakah gambar profil diubah atau tidak

    if(req.files === null){
        // Jika job tidak mengupload gambar baru
        fileName = job.image; // menggunakan gambar lama
    }else{
        // Jika job mengupload gambar baru
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image harus lebih kecil dari 5mb"});

        const filepath = `./public/jobs/${job.image}`;
        if (fs.existsSync(filepath)) {
            // Jika gambar profil sebelumnya ada, hapus gambar profil sebelumnya
            fs.unlinkSync(filepath);
        }

        file.mv(`./public/jobs/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
        imageChanged = true; // Set variable imageChanged menjadi true karena gambar profil diubah
    }

    const companyName = req.body.companyName
    const companyAddress = req.body.companyAddress
    const salary = req.body.salary
    const jobRole = req.body.jobRole
    const jobLevel = req.body.jobLevel
    const jobType = req.body.jobType
    const jobShortDescription = req.body.jobShortDescription
    const jobLongDescription = req.body.jobLongDescription
    const education = req.body.education
    const industry = req.body.industry
    const url = `${req.protocol}://${req.get("host")}/jobs/${fileName}`;

    try {
        await Job.update({
            companyName: companyName, 
            companyAddress: companyAddress, 
            salary: salary, 
            jobRole: jobRole,
            jobLevel: jobLevel,
            jobType: jobType,
            jobShortDescription: jobShortDescription,
            jobLongDescription: jobLongDescription,
            education: education,
            industry: industry,
            image: fileName, 
            url: url
        },{
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json({msg: "Job Updated Succesfully", imageChanged: imageChanged}); // Mengirimkan response bahwa imageChanged bernilai true jika gambar profil diubah dan false jika tidak
    } catch (error) {
        console.log(error.message);
    }
}

const deleteJob = async(req, res) => {
    const job = await Job.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!job) return res.status(404).json({msg: "No Data Found"})
    try {
        const filepath = `./public/jobs/${job.image}`
        fs.unlinkSync(filepath)
        await Job.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Job Deleted Succesfully"})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}