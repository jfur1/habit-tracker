import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'

// @Route:  GET /api/habits/all
// @Desc:   Return all habits for a given user
// @Access: Private
export const getHabits = asyncHandler(async (req, res) => {
    // This syntax returns the first element from the array of results and stores it in a new array called 'rows'.

    const user_id = req.user[0]?.user_id;
    
    console.log('req.user:', req.user[0]?.user_id)

    console.log('id: ', user_id)

    // PREPARED STATEMENT SYNTAX
    const [rows] = await connectionPool.query(`
    SELECT * 
    FROM habits
    WHERE user_id = ?
    `, [user_id]);

    if(rows)
        res.status(200).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})
})


// @Route:  GET /api/habits
// @Desc:   Return all habits for a given user
// @Access: Private
export const getHabit = asyncHandler(async (req, res) => {
    const user_id = req.headers.id;
    const habit_id = req.params.habit_id;

    // PREPARED STATEMENT SYNTAX
    const [rows] = await connectionPool.query(`
    SELECT * 
    FROM habits
    WHERE user_id = ? 
    AND habit_id = ?
    `, [user_id, habit_id]);

    if(rows)
        res.status(200).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})

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
    const {
        habit_id,
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
    console.log('Trying to upsert the following: ', req.body);

    const [rows] = await connectionPool.query(`
    UPDATE habits
    SET title=?, schedule=?, frequency=?, units=?, type=?, description=?, color=?, icon=?
    WHERE user_id = ?
    AND habit_id = ?
    `, [title, schedule, frequency, units, type, description, color, icon, user_id, habit_id]);
    console.log('rows:', rows)

    if(rows)
        res.status(200).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})

})


// @Route:  DELETE /api/habits/:id
// @Desc:   Delete Goal
// @Access: Private
export const deleteHabit = asyncHandler(async (req, res) => {
    const habitID = req.params.habit_id;

    console.log('Trying to delete habit with ID: ',  req.params.habit_id)

    const [rows] = await connectionPool.query(`
    DELETE FROM habits
    WHERE habit_id = ?
    `, [habitID]);

    if(rows)
        res.status(204).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})

})