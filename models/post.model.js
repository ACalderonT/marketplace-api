const pool = require('../database/connection.js');
const format = require('pg-format');
require('dotenv').config();

const DEFAULT_COLUMN = "created_at"
const DEFAULT_DIRECTION = "DESC"
const DEFAULT_LIMIT = 9

const create = async ({ productName, description, brand, price, images, location, category, creatorId }) => {
    try{
        const now = new Date().toISOString();
        const query = "INSERT INTO posts (title, description, brand, price, images, location, category_id, creator_id, created_at, updated_at) VALUES (%L, %L, %L, %L, %L::text[], %L, %L, %L, %L, %L) RETURNING *";
        const formattedQuery = format(query, productName, description, brand, price, images, location, category, creatorId, now, now);
        const { rows: newPost } = await pool.query(formattedQuery);

        return newPost[0];
    }catch(error){
        console.log(error)
        return error
    }
};

const findAll = async ({ page = 1, brand, categories, price, option, order }) => {
    try{
        const response = {}
        const totalQuery = "SELECT count(*) FROM posts"
        const { rows } = await pool.query(totalQuery)
        response['total'] = rows[0].count

        const offset = (page -1) * DEFAULT_LIMIT;
        let filtros = []
        const values = []
        const min_price = price !== undefined ? price[0] : null
        const max_price = price !== undefined ? price[1] : null

        if(brand !== undefined){
            values.push(brand)
            filtros.push(`p.brand IN (%L)`)
        }

        if(categories !== undefined){
            values.push(categories)
            filtros.push(`p.category_id IN (%L)`)
        }

        if(price != undefined) {
            values.push(min_price, max_price)
            filtros.push(`p.price >= %L`)
            filtros.push(`p.price <= %L`)
        }

        let productQuery = `SELECT p.id,
                                    p.title,
                                    p.description,
                                    p.brand,
                                    p.price,
                                    p.images,
                                    c.name AS category,
                                    concat(u.name, ' ', u.lastname) AS seller,
                                    TO_CHAR(p.created_at::date, 'dd/mm/yyyy') AS date,
                                    p.location
                                FROM posts p
                                JOIN users u ON (u.id = p.creator_id)
                                JOIN categories c ON (c.id = p.category_id)`;

        if(filtros.length > 0){
            filtros = filtros.join(" AND ")
            productQuery += ` WHERE ${filtros}`
        }

        let orderField = option ? option : DEFAULT_COLUMN;
        let orderDirection = order ? order : DEFAULT_DIRECTION;

        const orderQuery = ` ORDER BY p.${orderField} ${orderDirection} LIMIT 9 OFFSET ${offset}`
        productQuery += orderQuery

        const formattedQuery = format.withArray(productQuery, values);
        const { rows: posts } = await pool.query(formattedQuery);

        response['products'] = posts
        return response
    }catch(error){
        console.log(error)
        return error;
    }
}

const findPostById = async (id) => {
    try{
        const query = `SELECT 
                            p.id,
                            p.title,
                            p.description,
                            p.price,
                            p.brand,
                            p.category_id,
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

const updatePost = async (id, { productName, description, brand, price, images, location, category, creatorId }) => {
    try{
        const now = new Date().toISOString();
        const values = [productName, description, brand, price, images, location, creatorId, category, now, id]
        const query = `UPDATE posts 
                        SET title = %L::text,
                            description = %L,
                            brand = %L,
                            price = %L,
                            images = %L,
                            location = %L,
                            creator_id = %L,
                            category_id = %L,
                            updated_at = %L
                        WHERE id = %L RETURNING *`;
        const formattedQuery = format.withArray(query, values)
        const  { rows: updatedPost } = await pool.query(formattedQuery);

        return updatedPost[0]
    }catch(error){
        return error
    }
}

const brands = async () => {
    try{
        const query = `SELECT DISTINCT brand FROM posts`
        const { rows: allBrands } = await pool.query(query)

        return allBrands
    }catch(error){
        return error
    }
}

const prices = async () => {
    try{
        const maxQuery = `SELECT max(price) FROM posts`
        const { rows: maxPrice } = await pool.query(maxQuery);

        const minQuery = `SELECT min(price) FROM posts`
        const { rows: minPrice } = await pool.query(minQuery);
        
        return [minPrice[0].min, maxPrice[0].max]
    }catch(error){
        return error
    }
}

const postModel = {
    create,
    findAll,
    findPostById,
    findPostsByCreatorId,
    removePost,
    updatePost,
    brands,
    prices
}

module.exports = postModel;