import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authMiddleware = (req, res, next) => {
    try{
        const Authorization = req.header("Authorization");
        const token = Authorization?.split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "No token provided"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET);
        const { email } = jwt.decode(token);
        req.user = { email }
        next();
    }catch(error){
        console.log(error);
        return res.status(401).send({ error: "Invalid Token" });
    }
}