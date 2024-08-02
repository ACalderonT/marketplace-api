const jwt = require('jsonwebtoken');
const userModel = require('../../models/user.model');
const { handleVerifyPasswordHash } = require('../../utils/password.utils');
require('dotenv').config();


const HandleLoginMiddleware = async (req, res, next) => {
    try{
        const { email, password } = req.body
        const { id, password: passwordHashed } = await userModel.findUserByEmail( email );
        const isMatch = await handleVerifyPasswordHash(password, passwordHashed);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials", 
                origin: 'Authorization' 
            });
        }

        const user = await userModel.setActiveAccount(id)

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User could not be authenticated",
                origin: 'Authorization'
            })
        }

        const payload = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            active: user.active
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        req.token = token
        next()
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            origin: "Authorization"
        })
    }
}

module.exports = HandleLoginMiddleware;