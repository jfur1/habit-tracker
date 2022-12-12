import { Sequelize, DataTypes } from 'sequelize'
import db from '../config/database.js'
import Habit from './habitModel.js'

const User = db.define(`users`, {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

User.hasMany(Habit);    // Set one to many relationship
 
export default User;