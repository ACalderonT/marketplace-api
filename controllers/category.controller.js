const categoryModel = require('../models/category.model');

const getAllCategories = async (req, res) => {
    try{
        const allCategories = []
        const categories = await categoryModel.findAllCategories()

        categories.map((category) => {
            const newCategory = {
                label: category.name,
                value: category.id
            }

            allCategories.push(newCategory)
        })

        return res.status(200).json({
            success: true,
            data: allCategories
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

const categoryController = {
    getAllCategories
}

module.exports = categoryController;