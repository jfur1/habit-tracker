import connectionPool from '../config/conn.js'
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { getHabit, getHabits, createHabit, updateHabit, deleteHabit } from '../controllers/habitController.js';
import protect from '../middleware/authMiddleware.js'

const habitRoutes = express.Router();

habitRoutes.route('/').get(protect, getHabits);

habitRoutes.route('/:habit_id').get(protect, getHabit).post(protect, createHabit).put(protect, updateHabit);
habitRoutes.route('/:habit_id').delete(protect, deleteHabit);

export default habitRoutes