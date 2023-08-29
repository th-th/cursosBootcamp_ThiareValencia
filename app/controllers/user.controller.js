import { Bootcamp } from "../models/bootcamp.model.js";
import { User } from "../models/user.model.js";

async function createUser(firstName, lastName, email){
    try {
        const user = await User.create({
            firstName,
            lastName,
            email
        })
        return user.dataValues;
    } catch (error) {
        console.log(error);
    }
}

async function findUserById(userId){
    try {
        const user = await User.findByPk(userId, {
            include: Bootcamp
        });

        return user.dataValues;
    } catch (error) {
        console.log(error);
    }
}

async function findAll(){
    try {
        const users = await User.findAll({
            include: Bootcamp
        });

        return users.map(user => user.dataValues);
    } catch (error) {
        console.log(error);
    }
}

async function updateUserById(userId, options){
    try {
        await User.update(options, {
            where: { id: userId }
        });
        
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserById(userId){
    try {
        await User.destroy({
            where: {
              id: userId
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export default {
    createUser,
    findUserById,
    findAll,
    updateUserById,
    deleteUserById,
}