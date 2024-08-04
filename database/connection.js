const pkg = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { Pool } = pkg;

const pool = new Pool ({ 
    allowExitOnIdle: true
});

const sqlFilePath = path.join(__dirname, 'init-db.sql');

async function initDataBase() {
    try{
        const sql = fs.readFileSync(sqlFilePath, 'utf-8');
        await pool.query(sql);
        console.log('\x1b[7m%s\x1b[0m',`Database connected and initialized successfully.`);
    }catch(error){
        console.log(error)
    }
}

initDataBase();

module.exports = pool;