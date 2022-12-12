import connectionPool from '../config/conn.js'
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { getUserHabits, getAllHabits, createHabit, updateHabit, deleteHabit } from '../controllers/habitController.js';
import protect from '../middleware/authMiddleware.js'

const habitRoutes = express.Router();

habitRoutes.route('/').get(protect, getAllHabits).post(protect, createHabit).put(protect, updateHabit);

habitRoutes.route('/:id').delete(protect, deleteHabit);

export default habitRoutes