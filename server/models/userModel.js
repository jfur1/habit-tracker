import { Sequelize, DataTypes } from 'sequelize'
import db from '../config/database.js'

const User = db.define('User',{
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
    timestamps: true
});
 
export default User;