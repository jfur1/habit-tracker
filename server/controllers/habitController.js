import Product from '../models/userModel.js'
import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'
import Models from '../models/userModel.js'

// @Route:  GET /api/habits
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


// @Route:  GET /api/habits
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



// @Route:  POST /api/habits
// @Desc:   Create new habit
// @Access: Private
export const createHabit = asyncHandler(async (req, res) => {
    const {
        user_id,
        title,
        schedule,
        frequency,
        units,
        type,
        description,
        color,
        icon
    } = req.body;

    console.log('Trying to insert: ', req.body)

    const [rows] = await connectionPool.query(`
    INSERT INTO
    habits (user_id, title, schedule, frequency, units, type, description, color, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_id, title, schedule, frequency, units, type, description, color, icon]);
    console.log('rows:', rows)

    if(rows)
        res.status(201).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})
})



// @Route:  PUT /api/habits
// @Desc:   Update existing habit
// @Access: Private
export const updateHabit = asyncHandler(async (req, res) => {

})


// @Route:  DELETE /api/habits/:id
// @Desc:   Delete Goal
// @Access: Private
export const deleteHabit = asyncHandler(async (req, res) => {

})