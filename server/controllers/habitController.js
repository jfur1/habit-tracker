import Product from '../models/habitModel.js'
import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'

// @Route:  /api/habits
// @Desc:   Return all habits for a given user
// @Access: Private
export const getUserHabits = async(user_id) => {
    // This syntax returns the first element from the array of results and stores it in a new array called 'rows'.

    // PREPARED STATEMENT SYNTAX
    const [rows] = await connectionPool.query(`
    SELECT * 
    FROM habits
    WHERE user_id = ?
    `, [user_id]);

    return rows;
}


// @Route:  /api/habits/all
// @Desc:   Return all habits (Test route)
// @Access: Private
export const getAllHabits = asyncHandler(async (req, res) => {
    console.log('Fetching all habits...')

    const [rows] = await connectionPool.query(`
    SELECT * 
    FROM habits`);

    console.log('Results: ', rows)

    res.status(200).json(rows)
})