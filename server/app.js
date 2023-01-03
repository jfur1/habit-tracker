import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import habitRoutes from './routes/habitRoutes.js'
import entryRoutes from './routes/entryRoutes.js'
dotenv.config();
const port = process.env.DB_PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({"Access-Control-Allow-Origin": "http://localhost:3000"}))


// Base routes
app.use('/api/habits', habitRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/', userRoutes);

// get driver connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}, (err) => {
    if(err)
        console.log(err);
});