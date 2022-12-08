import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

var connectionPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connectionPool.getConnection((err,connection)=> {
    if(err)
        throw err;
    console.log('Database connected successfully');
    connection.release();
});
  
export default connectionPool.promise();