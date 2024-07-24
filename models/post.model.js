import { pool } from "../database/connection.js";
import format from "pg-format";
import "dotenv/config";


const BASE_URL = process.env.NODE_ENV === "production" ? process.env.DOMAIN_URL_APP : `${process.env.LOCAL_URL}:${process.env.PORT}`

const createPost = async ({ title, description, brand, price, images, location, creatorId }) => {
    try{
        const query = "INSERT INTO posts (title, desctiption, brand, price, images, location, creatorId) VALUES (%L, %L, %L, %L, %L, %L, %L) RETURNING *";
        const formattedQuery = format(query, title, description, brand, price, images, location, creatorId);

        const { rows: newPost } = await pool.query(formattedQuery);

        return newPost[0];
    }catch(error){
        console.log(error)
    }
};

const findAllPosts = async () => {
    try{
        const query = "SELECT * FROM posts"
        const { rows: posts } = await pool.query(query);

        const response = posts[0]
        return response;
    }catch(error){
        console.log(errors);
    }
}

const findPostById = async (id) => {
    try{
        const query = "SELECT * FROM posts WHERE id = %L"
        const formattedQuery = format(query, id);
        const { rows: post } = await pool.query(formattedQuery);

        const response = post[0]

        return response
    }catch(error){
        console.log(error)
    }
};

const findPostsByCreatorId = async({ creatorId }) => {
    try{
        const query = "SELECT * FROM posts WHERE creator_id = %L"
        const formattedQuery = format(query, creatorId);
        const { rows: creatorPosts } = await pool.query(formattedQuery);

        const response = creatorPosts[0]

        return response;
    }catch(error){
        console.log(error)
    }
};

const removePost = async ({ postId }) => {
    try{
        const query = "DELETE FROM posts WHERE id = %L RETURNING *"
        const formattedQuery = format(query, postId)

        const { rows: deletedPost } = await pool.query(formattedQuery);

        return deletedPost[0]
    }catch(error){
        console.log(error)
    }
}

const updatePost = async ({ id, updatedFields }) => {
    const setClause = Object.keys(updatedFields)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ')

    const values = Object.values(updatedFields);

    values.push(id);

    try{
        const query = `UPDATE posts SET ${setClause} WHERE id = $${values.length} RETURNING *`;

        const  { rows: updatedPost } = await pool.query(query, values);

        return updatedPost[0]
    }catch(error){
        console.log(error)
    }
}


export const postModel = {
    createPost,
    findAllPosts,
    findPostById,
    findPostsByCreatorId,
    removePost,
    updatePost
}