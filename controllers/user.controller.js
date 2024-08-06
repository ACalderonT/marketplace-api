const userModel = require('../models/user.model');
const getDatabaseError = require('../lib/database.error');

const create = async (req, res) => {
    try{
        const { name, lastname, email, phone, password } = req.body

        if (!name || !email || !password || !phone){
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, phone and password are required.' 
            })
        }

        const response = await userModel.createUser(name, lastname, email, phone, password);

        if (response.severity === "ERROR") {
            throw response
        }

        return res.status(201).json({ 
            success: true, 
            message: "User created successfully", 
            data: response 
        })
    }catch(error){
		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ 
                success: false, 
                message 
            });
		}

		return res.status(500).json({ 
            success:false, 
            message: "Internal server error" 
        });
    }

}

const read = async (req, res) => {
    try{
        const { email } = req.user 
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'unauthenticated user'
            })
        }

        return res.status(200).json({
            success: true,
            message: "authenticated user"
        })
    }catch(error){
        console.log(error);
        if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ 
                success: false, 
                message 
            });
		}

		return res.status(500).json({ 
            success:false, 
            message: "Internal server error" 
        });
    }
}

const update = async (req, res) => {
    try{
        const { id } = req.params
        const { name, lastname, phone, password } = req.body

        if (!name || !password || !phone){
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, phone and password are required.' 
            })
        }
        
        const response = await userModel.updateUser(id, name, lastname, phone, password)

        if(!response){
            return res.status(204).json({
                success: false,
                message: "No Content"
            })
        }

        return res.status(200).json({
            success: true,
            data: response
        })
    }catch(error){
        console.log(error);
        if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ 
                success: false, 
                message 
            });
		}

		return res.status(500).json({ 
            success:false, 
            message: "Internal server error" 
        });
    }
}

const logIn = async (req, res) => {
    try{
        const { email } = req.body
        const token = req.token
        const user = await userModel.findUserByEmail(email)

        if (!user){
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User logged Successfully!",
            token
        })
    }catch(error){
        console.log(error)
        if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ 
                success: false, 
                message 
            });
		}

		return res.status(500).json({ 
            success:false, 
            message: "Internal server error" 
        });
    }
}

const userController = {
    create,
    read,
    update,
    logIn,
}

module.exports = userController;