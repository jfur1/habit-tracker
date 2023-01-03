import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'

// @Route:  GET /api/entries
// @Desc:   Return ALL entries for a given user
// @Access: Private
export const getEntries = asyncHandler(async (req, res) => {
    // This syntax returns the first element from the array of results and stores it in a new array called 'rows'.

    const user_id = req.headers.id;

    console.log('id: ', user_id)

    // PREPARED STATEMENT SYNTAX
    const [rows] = await connectionPool.query(`
    SELECT * 
    FROM entries
    WHERE user_id = ?
    `, [user_id]);

    if(rows)
        res.status(200).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})
})

// @Route:  GET /api/entries/:id
// @Desc:   Return 1 entry
// @Access: Private
export const getEntry = asyncHandler(async (req, res) => {
    const user_id = req.headers.id;
    const habit_id = req.params.id;

    // PREPARED STATEMENT SYNTAX
    const [rows] = await connectionPool.query(`
    SELECT * 
    FROM entries
    WHERE user_id = ?
    AND habit_id = ?
    `, [user_id, habit_id]);

    if(rows)
        res.status(200).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})

})

// @Route:  POST /api/entries
// @Desc:   Create a new entry
// @Access: Private
export const createEntry = asyncHandler(async (req, res) => {
    const {
        user_id,
        ymd,
        dowIdx,
        habit_id,
        frequency,
        units
    } = req.body;

    console.log('Checking for existing entry....')
    console.log('YMD: ', ymd)
    console.log('userID: ', user_id)
    console.log('habit_id: ', habit_id)


    const [existing] = await connectionPool.query(`
    SELECT * 
    FROM entries
    WHERE user_id = ?
    AND ymd = ?
    AND habit_id = ?
    `, [user_id, ymd, habit_id]);

    // Create
    if(!existing.length > 0){
        const [rows] = await connectionPool.query(`
        INSERT INTO
        entries (user_id, ymd, dowIdx, habit_id, frequency, units) VALUES (?, ?, ?, ?, ?, ?)
        `, [user_id, ymd, dowIdx, habit_id, frequency, units]);

        console.log('rows:', rows)

        if(rows)
            res.status(200).json(rows);
        else
            res.status(400).json({ msg: "Err. Please try again."})
    } else {
        const [rows] = await connectionPool.query(`
        UPDATE entries
        SET user_id=?, ymd=?, dowIdx=?, habit_id=?, frequency=?, units=?
        WHERE user_id = ?
        AND habit_id = ?
        AND ymd = ?
        `, [user_id, ymd, dowIdx, habit_id, frequency, units, user_id, habit_id, ymd]);

        console.log('rows:', rows)

        if(rows)
            res.status(201).json(rows);
        else
            res.status(400).json({ msg: "Err. Please try again."})
    }
})

// @Route:  PUT /api/entries/:id
// @Desc:   Update an existing Entry
// @Access: Private
export const updateEntry = asyncHandler(async (req, res) => {
    const {
        user_id,
        ymd,
        dowIdx,
        habit_id,
        frequency,
        units
    } = req.body;
    console.log('Trying to upsert the following: ', req.body);

    const [rows] = await connectionPool.query(`
    UPDATE entries
    SET user_id=?, ymd=?, dowIdx=?, habit_id=?, frequency=?, units=?
    WHERE user_id = ?
    AND habit_id = ?
    AND ymd = ?
    `, [user_id, ymd, dowIdx, habit_id, frequency, units, user_id, habit_id, ymd]);
    console.log('rows:', rows)

    if(rows)
        res.status(200).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})

})

// @Route:  DELETE /api/entries/:id
// @Desc:   Delete Entry
// @Access: Private
export const deleteEntry = asyncHandler(async (req, res) => {
    const entry_id = req.params.entry_id;

    console.log('Trying to delete habit with ID: ',  req.params.entry_id)

    const [rows] = await connectionPool.query(`
    DELETE FROM habits
    WHERE entry_id = ?
    `, [entry_id]);

    if(rows)
        res.status(204).json(rows);
    else
        res.status(400).json({ msg: "Err. Please try again."})
})