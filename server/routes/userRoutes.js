import express from 'express';
const userRoutes = express.Router();
import {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  forgotPassword,
  validateResetToken,
  resetPassword
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js'

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/update', protect, updateUser)
userRoutes.post('/password', protect, updatePassword)
userRoutes.post('/forgot', forgotPassword)
userRoutes.get('/reset/:id/:token', validateResetToken)
userRoutes.post('/reset/:id/:token', resetPassword)

export default userRoutes