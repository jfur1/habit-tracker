import connectionPool from '../config/conn.js'
import express from 'express';
import { getEntry, getEntries, createEntry, updateEntry, deleteEntry } from '../controllers/entryController.js';
import protect from '../middleware/authMiddleware.js'

const entryRoutes = express.Router();

entryRoutes.route('/').get(protect, getEntries).post(protect, createEntry);

entryRoutes.route('/:id').get(protect, getEntry).put(protect, updateEntry).delete(protect, deleteEntry);


export default entryRoutes