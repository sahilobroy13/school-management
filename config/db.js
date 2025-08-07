const mysql = require("mysql2");
const dotenv = require("dotenv");
const { pool } = require("pg");
dotenv.config();


const connection = new pool({
    host : process.env.Hostname,
    user : process.env.Username,
    password : process.env.Password,
    database : process.env.Database,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

connection.connect(err =>{
    if(err){
        console.log("DB Connection Failed !" , err.message);
    }else{
        console.log("Sql database Connected successfully !");
    }
})

module.exports = connection;