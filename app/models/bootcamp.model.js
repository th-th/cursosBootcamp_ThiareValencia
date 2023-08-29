import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Bootcamp = sequelize.define("Bootcamp", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 10
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: "bootcamps",
    updatedAt: true,
    createdAt: true,
})

export { Bootcamp };