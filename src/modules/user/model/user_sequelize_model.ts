import { DataTypes } from 'sequelize'
import Database from '../../../lib/database/database'

const sequelizeConnection =
    new Database().sequelizeConnection?.sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        rut: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email_is_verified: {
            type: DataTypes.STRING,
        },
        phone_is_verified: {
            type: DataTypes.STRING,
        },
        verification_code: {
            type: DataTypes.STRING,
        },
    })
