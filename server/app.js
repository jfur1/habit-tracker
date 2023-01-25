import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import habitRoutes from './routes/habitRoutes.js'
import entryRoutes from './routes/entryRoutes.js'
import connectionPool from './config/conn.js'
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config();

const port = process.env.DB_PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({"Access-Control-Allow-Origin": "http://localhost:3000"}))

// For email templates
app.set('view engine', 'ejs');

// Base routes
app.use('/api/habits', habitRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/', userRoutes);

// Serve Front End (Deployment)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var args = process.argv;
if(process.env.NODE_ENV === 'PROD'){
    app.use(express.static(path.join(__dirname, '../client/out')));
} else {
    // In case dev navigates to localhost:8080/... without setting process.env.NODE_ENV
    app.get('/', (req, res) => res.send('Please set to prod! [--prod]'))
}

// get driver connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}, (err) => {
    if(err)
        console.log(err);
});