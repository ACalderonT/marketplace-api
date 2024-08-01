import { pool } from "../database/connection.js";
import format from "pg-format";
import "dotenv/config";


const BASE_URL = process.env.NODE_ENV === "production" ? process.env.DOMAIN_URL_APP : `${process.env.LOCAL_URL}:${process.env.PORT}`

const createPost = async ({ productName, description, brand, price, images, location, creatorId }) => {
    try{
        const now = new Date().toISOString();
        const query = "INSERT INTO posts (title, description, brand, price, images, location, creator_id, created_at, updated_at) VALUES (%L, %L, %L, %L, %L::text[], %L, %L, %L, %L) RETURNING *";
        const formattedQuery = format(query, productName, description, brand, price, images, location, creatorId, now, now);
        const { rows: newPost } = await pool.query(formattedQuery);

        return newPost[0];
    }catch(error){
        return error
    }
};

const findAllPosts = async () => {
    try{
        const response = {}
        const totalQuery = "SELECT count(*) FROM posts"
        const { rows } = await pool.query(totalQuery)

        response['total'] = rows[0].count

        const query = `SELECT p.id,
                              p.title,
                              p.description,
                              p.price,
                              TO_CHAR(p.created_at::date, 'dd/mm/yyyy') AS date,
                              CONCAT(u.name, ' ', u.lastname) as user,
                              p.images,
                              p.creator_id
                         FROM posts p
                         JOIN users u ON (u.id = p.creator_id)
                     ORDER BY p.created_at DESC`
        const { rows: posts } = await pool.query(query);

        response['products'] = posts
        return response
    }catch(error){
        return error;
    }
}

const findPostById = async (id) => {
    try{
        const query = `SELECT p.id,
                              p.title,
                              p.description,
                              p.price,
                              TO_CHAR(p.created_at::date, 'dd/mm/yyyy') AS date,
                              CONCAT(u.name, ' ', u.lastname) AS seller,
                              p.images,
                              p.creator_id,
                              p.location
                         FROM posts p
                         JOIN users u ON (u.id = p.creator_id)
                        WHERE p.id = %L`
        const formattedQuery = format(query, id);
        const { rows: post } = await pool.query(formattedQuery);

        const response = post[0]

        return response
    }catch(error){
        return error
    }
};

const findPostsByCreatorId = async (creator_id) => {
    try{
        const query = "SELECT * FROM posts WHERE creator_id = %L"
        const formattedQuery = format(query, creator_id);
        const { rows: creatorPosts } = await pool.query(formattedQuery);
        const response = creatorPosts

        return response
    }catch(error){
        return error
    }
};

const findFavoritePosts = async (user_id) => {
    try{
        const query = `SELECT p.id,
                              p.title,
                              p.description,
                              p.brand,
                              p.price,
                              p.images,
                              p.location
                         FROM favorites f
                         JOIN posts p ON (p.id = f.post_id)
                        WHERE f.user_id = %L`
        const formattedQuery = format(query, user_id);
        const { rows: favorites } = await pool.query(formattedQuery);
        const response = favorites;

        return response
    }catch(error){
        return error
    }
};

const removePost = async (post_id) => {
    try{
        const query = "DELETE FROM posts WHERE id = %L RETURNING *"
        const formattedQuery = format(query, post_id)
        const { rows: deletedPost } = await pool.query(formattedQuery);

        return deletedPost[0]
    }catch(error){
        return error
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
        return error
    }
}


export const postModel = {
    createPost,
    findAllPosts,
    findPostById,
    findPostsByCreatorId,
    findFavoritePosts,
    removePost,
    updatePost
}