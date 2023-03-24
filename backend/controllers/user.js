const { User } = require('../models')
const argon2 = require('argon2')
const fs = require("fs")
const path = require("path")

const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes:["uuid", "email", "username", "nohp", "status", "instagramUrl", "facebookUrl", "image", "url"],
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes:["uuid", "email", "username", "nohp", "status", "instagramUrl", "facebookUrl", "image", "url"],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createUser = async(req, res) => {
    const {email, password, confPassword,  } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password Tidak Cocok"})
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            email: email,
            password: hashPassword
        })
        res.status(201).json({msg: "Register Berhasil"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const updateUser = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!user) {
            return res.status(404).json({msg: "User Tidak Ditemukan"})
        }

        let fileName = user.image
        if (req.files !== null) {
            const file = req.files.file
            const fileSize = file.size
            const ext = path.extname(file.name)
            fileName = file.md5 + ext
            const allowedType = ['.png','.jpg','jpeg']

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({msg: "Invalid Image"})
            }

            if (fileSize > 5000000) {
                return res.status(422).json({msg: "Image harus lebih kecil dari 5mb"})
            }

            if (user.image) {
                const filepath = `./public/users/${user.image}`
                fs.unlinkSync(filepath)
            }

            file.mv(`./public/users/${fileName}`, (err)=>{
                if(err) {
                    return res.status(500).json({msg: err.message})
                }
            })
        } else if (!user.image) {
            return res.status(422).json({msg: "Image harus diunggah"})
        }

        const username = req.body.username
        const nohp = req.body.nohp
        const status = req.body.status
        const instagramUrl = req.body.instagramUrl
        const facebookUrl = req.body.facebookUrl
        const url = `${req.protocol}://${req.get("host")}/users/${fileName}`

        await User.update({
            username: username,
            nohp: nohp,
            status: status,
            instagramUrl: instagramUrl,
            facebookUrl: facebookUrl,
            image: fileName,
            url: url
        },{
            where:{
                uuid: req.params.id
            }
        })

        res.status(200).json({msg: "Users Updated Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    try {
        const filepath = `./public/users/${user.image}`
        fs.unlinkSync(filepath)
        await User.destroy({
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg: "User Deleted"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}