import { Sequelize } from 'sequelize';
import db from "../config/database.js";

const { DataTypes } = Sequelize;
 
const Habit = db.define('habits',{
    habit_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: 'users', // <<< Note, its table's name, not object name
        referencesKey: 'user_id' // <<< Note, its a column name
    },
    title:{
        type: DataTypes.STRING
    },
    color:{
        type: DataTypes.STRING
    },
    schedule:{
        type: DataTypes.STRING
    },
    frequency: {
        type: DataTypes.INTEGER
    },
    units: {
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    icon: {
        type: DataTypes.INTEGER
    },
},{
    freezeTableName: true,
    timestamps: false
});

export default Habit;