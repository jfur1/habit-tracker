import express from 'express';
const userRoutes = express.Router();
import {
  registerUser,
  loginUser,
  updateUser,
  updatePassword
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js'

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/update', protect, updateUser)
userRoutes.post('/password', protect, updatePassword)

export default userRoutes