const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();


const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
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