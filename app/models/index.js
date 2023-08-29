import { Sequelize } from "sequelize";
import database from "../config/db.config.js";

const { user, password, port, name } = database;

const sequelize = new Sequelize(`postgres://${user}:${password}@localhost:${port}/${name}`);

try {
    await sequelize.authenticate();
    console.log("La conexión a la base se realizó exitosamente");
} catch (err) {
    console.log("No se pudo realizar la conexión a la base de datos: ", err);
}

export default sequelize;