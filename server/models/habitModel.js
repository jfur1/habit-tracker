import { Sequelize } from 'sequelize';
import db from "../config/database.js";

const { DataTypes } = Sequelize;
 
const Habit = db.define('habits',{
    title:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Habit;