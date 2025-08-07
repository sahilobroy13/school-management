const mysql = require("mysql2");
const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config();


const pool = new Pool({
    host : process.env.Hostname,
    user : process.env.Username,
    password : process.env.Password,
    database : process.env.Database,
    max: 10,                   
    idleTimeoutMillis: 30000,  
    connectionTimeoutMillis: 2000,
})

pool.connect((err, client, release) => {
    if (err) {
        console.error("DB Connection Failed!", err.stack);
    } else {
        console.log("PostgreSQL database connected successfully!");
        release(); 
    }
});

module.exports = pool;