import { pool } from "../database/connection";
import format from "pg-format";
import "dotenv/config";

const findAllFavorites = async({ userId }) => {
    try{
        const query = "SELECT * FROM posts WHERE user_id = %L"
        const formattedQuery = format(query, userId);
        const { rows: creatorPosts } = await pool.query(formattedQuery);

        const response = creatorPosts[0]

        return response;
    }catch(error){
        console.log(error)
    }
};


const createFavorite = async ({ userId, postId }) => {
    try{
        const query = "INSERT INTO favorites (userId, postId) VALUES (%L, %L) RETURNING *";
        const formattedQuery = format(query, userId, postId );

        const { rows: newFavoritePost } = await pool.query(formattedQuery);

        return newFavoritePost[0];
    }catch(error){
        console.log(error)
    }
};

const removeFavoritePost = async ({ userId, postId }) => {
    try{
        const query = "DELETE FROM posts WHERE user_id = %L AND post_id = %L RETURNING *"
        const formattedQuery = format(query, userId, postId)

        const { rows: deletedFavoritePost } = await pool.query(formattedQuery);

        return deletedFavoritePost[0]
    }catch(error){
        console.log(error)
    }
}


export const Favorite = {
    findAllFavorites,
    createFavorite,
    removeFavoritePost
}