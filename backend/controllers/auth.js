const { User } = require("../models")
const argon2 = require('argon2')

const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    const match = await argon2.verify(user.password, req.body.password)
    if(!match) return res.status(400).json({msg: "Email atau password salah"})
    req.session.userId = user.uuid
    const uuid = user.uuid
    const email = user.email
    res.status(200).json({uuid, email, match})
}

const Me = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon Login ke Akun Anda"})
    }
    const user = await User.findOne({
        attributes:["uuid", "email"],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    res.status(200).json(user)
}

const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak Dapat Logout"})
        res.status(200).json({msg: "Anda Telah Logout"})
    })
}

module.exports = {
    Login,
    Me,
    LogOut
}