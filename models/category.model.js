const pool = require('../database/connection');
const format = require('pg-format');
require('dotenv').config();

const findAllCategories = async () => {
    try{
        const query = "SELECT * FROM categories"
        const formattedQuery = format(query);
        const { rows: allCategories } = await pool.query(formattedQuery);

        const response = allCategories

        return response;
    }catch(error){
        console.log(error)
    }
};

const categoryModel = {
    findAllCategories
}

module.exports = categoryModel;