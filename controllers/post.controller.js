const postModel = require('../models/post.model');
const getDatabaseError = require('../lib/database.error')

const create = async (req, res) => {
    try{
        const newPost = req.body
        const response = await postModel.create(newPost.payload)

        if(response.severity === 'ERROR'){
            throw response
        }

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
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

const allPosts = async (req, res) => {
    try{
        const params = req.query
        const response = await postModel.findAll(params)

        if(response.severity === 'ERROR') {
            throw response
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
            return res.status(204).json({
                success: false,
                message: "No Content"
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

const getAllBrands = async (req, res) => {
    try{
        const allBrands = []
        const brands = await postModel.brands()

        brands.map((brand) => {
            const newBrand = {
                label: brand.brand,
                value: brand.brand
            }

            allBrands.push(newBrand)
        })

        return res.status(200).json({
            success: true,
            data: allBrands
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

const getPricesLimits = async (req, res) => {
    try{
        const priceLimits = await postModel.prices()

        return res.status(200).json({
            success: true,
            data: {
                min: priceLimits[0],
                max: priceLimits[1]
            }
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
        const payload = req.body;
        const updatedPost = await postModel.updatePost(id, payload);

        if(!updatedPost){
            res.status(204).json({
                success: false,
                message: "No Content"
            })
        }

        res.status(200).json({
            success: true,
            data: updatedPost
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
    getAllBrands,
    getPricesLimits,
    remove,
    update
}

module.exports = postController;