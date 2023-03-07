const { User } = require('../models')
const argon2 = require('argon2')

const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes:["uuid", "email", "username", "nohp", "status", "instagramUrl", "facebookUrl"],
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes:["uuid", "email", "username", "nohp", "status", "instagramUrl", "facebookUrl"],
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

        if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    
        const { username, nohp, status, instagramUrl, facebookUrl } = req.body;

        await User.update({
            username: username,
            nohp: nohp,
            status: status,
            instagramUrl: instagramUrl,
            facebookUrl: facebookUrl
        },{
            where:{
                id: user.id
            }
        })
        
        res.status(200).json({msg: "User Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message})
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