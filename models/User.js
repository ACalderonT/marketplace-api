import { pool } from "../database/connection";
import format from "pg-format";
import { handleHashPassword } from "../utils/password.utils";
import "dotenv/config";

const findUserByEmail = async({ email }) => {
    try{
        const query = "SELECT * FROM users WHERE email = %L"
        const formattedQuery = format(query, email);
        const { rows: user } = await pool.query(formattedQuery);

        const response = {
            email: user?.email
        }

        return response
    }catch(error){
        console.log(error)
    }
};

const createUser = async ({ name, lastname, email, phone, password }) => {
    try{
        const hashedPassword = await handleHashPassword(password);
        const query = "INSERT INTO users (name, lastname, email, phone, password) VALUES (%L, %L, %L, %L, %L) RETURNING *";
        const formattedQuery = format(query, name, lastname, email, phone, hashedPassword);

        const { rows: newUser } = await pool.query(formattedQuery);

        return newUser[0];
    }catch(error){
        console.log(error)
    }
};


export const User = {
    findUserByEmail,
    createUser
}