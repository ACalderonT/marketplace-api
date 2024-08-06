const favoriteModel = require('../models/favorite.model');
const getDatabaseError = require('../lib/database.error');

const create = async (req, res) => {
    try{
        const { userId, postId } = req.params
        const newFavorite = await favoriteModel.createFavorite(userId, postId);

        res.status(201).json({
            success: true,
            data: newFavorite
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

const read = async (req, res) => {
    try{
        const { user_id } = req.query;
        const favoritePosts = await favoriteModel.findAllFavorites(user_id);

        if(!favoritePosts){
            res.status(404).json({
                success: false,
                message: "Posts Not Found"
            })
        }

        res.status(200).json({
            success: true,
            data: favoritePosts
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

const remove = async (req, res) => {
    try{
        const { userId, postId } = req.params
        const deletedFavorite = await favoriteModel.removeFavoritePost(userId, postId)

        res.status(200).json({
            success: true,
            data: deletedFavorite
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

const favoriteController = {
    create,
    read,
    remove
}

module.exports = favoriteController;