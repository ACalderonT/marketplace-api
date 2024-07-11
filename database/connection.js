import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

export const pool = new Pool ({ 
    allowExitOnIdle: true
});

try{
    const queryTest = await pool.query("Select now()");
    if (queryTest) console.log('\x1b[7m%s\x1b[0m',`Database connected.`);
}catch(error){
    console.log(error)
}