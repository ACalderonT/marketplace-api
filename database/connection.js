const pkg = require('pg');
require('dotenv').config();

const { Pool } = pkg;

const pool = new Pool ({ 
    allowExitOnIdle: true
});

async function testDatabaseConnection() {
    try{
        const queryTest = await pool.query("Select now()");
        if (queryTest) console.log('\x1b[7m%s\x1b[0m',`Database connected.`);
    }catch(error){
        console.log(error)
    }
}

testDatabaseConnection();

module.exports = pool;