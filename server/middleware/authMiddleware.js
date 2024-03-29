import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import connectionPool from '../config/conn.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      if(decoded){
        // Get user from the token

        [req.user] = await connectionPool.query(`
          SELECT user_id, first_name, last_name, email, created 
          FROM users
          WHERE user_id = ?
        `, [decoded.id]);

        console.log('Server side middleware setting req.user...');
        next()
      }
    } catch (error) {
      console.log(error)
      res.status(307).json({msg:'Not Authorized.'})
    }
  }

  if (!token) {
    res.status(404).json({msg:'Not Authorized. No token'})
  }
})

export default protect