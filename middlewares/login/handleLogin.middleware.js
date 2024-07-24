import jwt from 'jsonwebtoken';
import { userModel } from '../../models/user.model.js';
import { handleVerifyPasswordHash } from '../../utils/password.utils.js';
import 'dotenv/config';


export const HandleLoginMiddleware = async (req, res, next) => {
    try{
        const { email, password } = req.body
        const { password: passwordHash } = await userModel.findUserByEmail({ email });
        const isMatch = await handleVerifyPasswordHash(password, passwordHash);

        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials", origin: 'Authorization' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        req.token = token
        next()
    }catch(error){
        console.log(error);
    }
}