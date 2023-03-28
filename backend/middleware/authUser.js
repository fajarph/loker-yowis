const { User } = require("../models")

const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon Login ke Akun Anda"})
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    req.userId = user.id
    req.role = user.role
    next()
}

const adminOnly = async(req, res, next) => {
    console.log("Lihat disini", req.session)
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    if(user.role !== "Admin") return res.status(403).json({msg: "Akses Terlarang"})
    next()
}

module.exports = {
    verifyUser,
    adminOnly
}