const pool = require('../database/connection');
const format = require('pg-format');
require('dotenv').config();

const findAllCategories = async () => {
    try{
        const query = "SELECT * FROM categories"
        const formattedQuery = format(query);
        const { rows: allCategories } = await pool.query(formattedQuery);

        const response = allCategories[0]

        return response;
    }catch(error){
        console.log(error)
    }
};

const findCategoryByName = async ({ name }) => {
    try{
        const query = "SELECT * FROM categories WHERE name = %L"
        const formattedQuery = format(query, name);
        const { rows: category } = await pool.query(formattedQuery);

        const response = category[0]
        return response;
    }catch(error){
        console.log(error)
    }
}


const createCategory = async ({ name, description }) => {
    try{
        const query = "INSERT INTO categories (name, description) VALUES (%L, %L) RETURNING *";
        const formattedQuery = format(query, name, description );

        const { rows: newCategory } = await pool.query(formattedQuery);

        return newCategory[0];
    }catch(error){
        console.log(error)
    }
};

const removeCategory = async ({ name }) => {
    try{
        const query = "DELETE FROM posts WHERE name = %L RETURNING *"
        const formattedQuery = format(query, name)

        const { rows: deletedCategory } = await pool.query(formattedQuery);

        return deletedCategory[0]
    }catch(error){
        console.log(error)
    }
}

const Category = {
    findAllCategories,
    createCategory,
    findCategoryByName,
    removeCategory
}

module.exports = Category;