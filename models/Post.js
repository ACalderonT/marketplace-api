import { pool } from "../database/connection";
import format from "pg-format";
import "dotenv/config";


const BASE_URL = process.env.NODE_ENV === "production" ? process.env.DOMAIN_URL_APP : `${process.env.LOCAL_URL}:${process.env.PORT}`

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


export const Post = {
    findPostsByCreatorId,
    findAllPosts,
    createPost,
    removePost
}