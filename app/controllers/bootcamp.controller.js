import { Bootcamp } from "../models/bootcamp.model.js";
import { User } from "../models/user.model.js";

async function createBootcamp(title, cue, description) {
    try {
        const bootcamp = await Bootcamp.create({
            title,
            cue,
            description,
        });

        return bootcamp.dataValues;
    } catch (error) {
        console.log(error);
    }
}

async function addUser(userId, bootcampId) {
    try {
        const user = await User.findByPk(userId);
        const bootcamp = await Bootcamp.findByPk(bootcampId);

        if (user && bootcamp) {
            console.log(`Agregando el usuario id=${userId} al bootcamp con id=${bootcampId}`);

            await bootcamp.addUser(userId);
            console.log('Usuario agregado al bootcamp exitosamente.');
        } else {
            console.log('Usuario o bootcamp no encontrados.');
        }
    } catch (error) {
        console.log(error);
    }
}

async function findById(bootcampId) {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
            include: User
        });

        return bootcamp.dataValues;
    } catch (error) {
        console.log(error);
    }
}

async function findAll() {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: User
        });

        return bootcamps.map(bootcamp => bootcamp.dataValues);
    } catch (error) {
        console.log(error);
    }
}

export default {
    createBootcamp,
    addUser,
    findById,
    findAll,
}