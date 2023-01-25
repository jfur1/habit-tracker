import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

var connectionPool;
// var args = process.argv;
// // console.log('Args: ', args)
// var env;
// if(args.length > 2){
//     if(args[2] === '--prod')
//         env = 'PROD';
//     else
//         env = 'DEV';
// }

connectionPool = mysql.createPool({
    host: (process.env.NODE_ENV === 'DEV' 
        ? process.env.DB_HOST : process.env.RDS_HOSTNAME),

    user: (process.env.NODE_ENV === 'DEV' 
        ? process.env.DB_USER : process.env.RDS_USERNAME), 

    password: (process.env.NODE_ENV === 'DEV' 
        ? process.env.DB_PASSWORD : process.env.RDS_PASSWORD),

    database: (process.env.NODE_ENV === 'DEV' 
        ? process.env.DB_NAME : 'habit_tracker'),

    port: (process.env.NODE_ENV === 'DEV' 
        ? '' : process.env.RDS_PORT)
});

connectionPool.getConnection((err,connection)=> {
    if(err){
        console.error('Database connection failed: ' + err.stack);
        throw err;
    }

    console.log("MODE:", process.env.NODE_ENV)
    console.log('Database connected successfully');
    connection.release();
});
  
// export default (env === 'DEV' ?  connectionPool.promise() : connectionPool)
export default connectionPool.promise();