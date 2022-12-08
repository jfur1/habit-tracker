import connectionPool from '../config/conn.js'
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { getUserHabits, getAllHabits } from '../controllers/habitController.js';
import protect from '../middleware/authMiddleware.js'

const habitRoutes = express.Router();
habitRoutes.get('/', getUserHabits);
habitRoutes.get('/all', getAllHabits);

export default habitRoutes