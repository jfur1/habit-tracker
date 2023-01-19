import express from 'express';
const userRoutes = express.Router();
import {
  registerUser,
  loginUser,
  updateUser
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js'

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/update', protect, updateUser)

export default userRoutes