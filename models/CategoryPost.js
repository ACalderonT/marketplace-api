import { pool } from "../database/connection";
import format from "pg-format";
import "dotenv/config";

const findCategoryPostByPostId = async ({ post_id }) => {
    try{
        const query = "SELECT * FROM category_posts WHERE post_id = %L"
        const formattedQuery = format(query, post_id);
        const { rows: categoryPost } = await pool.query(formattedQuery);

        const response = categoryPost[0]
        return response;
    }catch(error){
        console.log(error)
    }
}

const createCategoryPost = async ({ category_id, post_id }) => {
    try{
        const query = "INSERT INTO category_posts (category_id, post_id) VALUES (%L, %L) RETURNING *";
        const formattedQuery = format(query, category_id, post_id );

        const { rows: newCategoryPost } = await pool.query(formattedQuery);

        return newCategoryPost[0];
    }catch(error){
        console.log(error)
    }
};

const removeCategoryPost = async ({ category_id, post_id }) => {
    try{
        const query = "DELETE FROM category_posts WHERE category_id = %L AND post_id = %L RETURNING *"
        const formattedQuery = format(query, category_id, post_id)

        const { rows: deletedCategoryPost } = await pool.query(formattedQuery);

        return deletedCategoryPost[0]
    }catch(error){
        console.log(error)
    }
}


export const CategoryPost = {
    findCategoryPostByPostId,
    createCategoryPost,
    removeCategoryPost
}