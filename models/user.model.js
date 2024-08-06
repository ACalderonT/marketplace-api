const pool = require('../database/connection');
const format = require('pg-format');
const { handleHashPassword } = require('../utils/password.utils');
require('dotenv').config();

const createUser = async ( name, lastname, email, phone, password ) => {
    try{
        const hashedPassword = await handleHashPassword(password);
        const now = new Date().toISOString();
        const query = "INSERT INTO users (name, lastname, email, phone, password, created_at, updated_at) VALUES (%L, %L, %L, %L, %L, %L, %L) RETURNING *";
        const formattedQuery = format(query, name, lastname, email, phone, hashedPassword, now, now);

        const { rows: newUser }= await pool.query(formattedQuery);
        
        const response = {
            id: newUser[0].id,
            name: newUser[0].name,
            lastname: newUser[0].lastname,
            email: newUser[0].email,
            phone: newUser[0].phone,
        }

        return response;
    }catch(error){
        return error
    }
};

const findUserByEmail = async( email ) => {
    try{
        const query = "SELECT * FROM users WHERE email = %L"
        const formattedQuery = format(query, email);
        const { rows: user } = await pool.query(formattedQuery);

        const response = user[0]

        return response
    }catch(error){
        return error
    }
};

const setActiveAccount = async ( userId ) => {
    try{
        const query = "UPDATE users SET active = true WHERE id = %L RETURNING *";
        const formattedQuery = format(query, userId);
        const { rows: userUpdated } = await pool.query(formattedQuery);
        
        const response = userUpdated[0]

        return response
    }catch(error){
        return error
    }
}

const updateUser = async ( id, name, lastname, phone, password ) => {
    try{
        const hashedPassword = await handleHashPassword(password);
        const now = new Date().toISOString();
        const values = [name, lastname, phone, hashedPassword, now, id]
        const query = `UPDATE users 
                        SET name = %L,
                            lastname = %L,
                            phone = %L,
                            password = %L,
                            updated_at = %L
                        WHERE id = %L 
                        RETURNING *`
        const formattedQuery = format.withArray(query, values)
        const { rows: updatedUser } = await pool.query(formattedQuery);

        return updatedUser[0]
    }catch(error){
        return error
    }
}

const userModel = {
    createUser,
    findUserByEmail,
    setActiveAccount,
    updateUser
}

module.exports = userModel;