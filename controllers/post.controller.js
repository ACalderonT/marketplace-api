const postModel = require('../models/post.model');

const create = async (req, res) => {
    try{
        const newPostReq = req.body
        const newPost = await postModel.createPost(newPostReq.payload)

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost
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

const allPosts = async (req, res) => {
    try{
        const posts = await postModel.findAllPosts()

        return res.status(200).json({
            success: true,
            data: posts
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

const findById= async (req, res) => {
    try{
        const { post_id } = req.params;
        const post = await postModel.findPostById(post_id)

        return res.status(200).json({
            success: true,
            data: post
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

const getAllByCreator = async (req, res) => {
    try{
        const { creator_id } = req.query
        const allPosts = await postModel.findPostsByCreatorId(creator_id)

        return res.status(200).json({
            success: true,
            data: allPosts
        });
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
        const { id } = req.params
        const deletedPost = await postModel.removePost(id)

        if(!deletedPost){
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            deletedPost
        })
    }catch(error){
        console.log(error);
    }
}

const update = async (req, res) => {
    try{
        return res.status(200)
    }catch(error){
        console.log(error);
    }
}

const favorites = async (req, res) => {
    try{
        const { user_id } = req.query
        const favoritePosts = await postModel.findFavoritePosts(user_id)

        return res.status(200).json({
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

const postController = {
    create,
    allPosts,
    findById,
    getAllByCreator,
    remove,
    update,
    favorites
}

module.exports = postController;