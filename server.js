import express from "express";
import userController from "./app/controllers/user.controller.js";
import { User } from "./app/models/user.model.js";
import { Bootcamp } from "./app/models/bootcamp.model.js";
import sequelize from "./app/models/index.js";
import bootcampController from "./app/controllers/bootcamp.controller.js";

const app = express();
const port = 8080;

app.listen(port, function() {
    console.log(`Corriendo en el puerto: ${port}`)
});

User.belongsToMany(Bootcamp, { through: 'user_bootcamp' });
Bootcamp.belongsToMany(User, { through: 'user_bootcamp' });

(async () => {
    await sequelize.sync({ force: true });

    const mateoDiaz = await userController.createUser("Mateo", "Díaz", "mateo.diaz@correo.com");
    const santiagoMejias = await userController.createUser("Santiago", "Mejías", "santiago.mejias@correo.com");
    const lucasRojas = await userController.createUser("Lucas", "Rojas", "lucas.rojas@correo.com");
    const facundoFernandez = await userController.createUser("Facundo", "Fernandez", "facundo.fernandez@correo.com");
    
    const react = await bootcampController.createBootcamp("Introduciendo El Bootcamp De React.", 10, "React es la librería más usada en JavaScript para el desarrollo de interfaces.");
    //En el FINAL DRILLING los siguientes bootcamp tienen CUE 12 y 18, sin embargo esto no cumple con la condición explicada en el mismo documento, que exige que el CUE sea un valor entre 5 y 10, por lo tanto se cambiaron a 7 y 9, respectivamente
    const fullStack = await bootcampController.createBootcamp("Bootcamp Desarrollo Web Full Stack.", 7, "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.");
    const bigData = await bootcampController.createBootcamp("Bootcamp Big Data, Inteligencia Artificial & Machine Learning.", 9, "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.");

    await bootcampController.addUser(mateoDiaz.id, react.id);
    await bootcampController.addUser(santiagoMejias.id, react.id);
    
    await bootcampController.addUser(mateoDiaz.id, fullStack.id);

    await bootcampController.addUser(mateoDiaz.id, bigData.id);
    await bootcampController.addUser(santiagoMejias.id, bigData.id);
    await bootcampController.addUser(lucasRojas.id, bigData.id);

    const bootcampById = await bootcampController.findById(bigData.id);
    console.log(bootcampById);

    const allBootcamps = await bootcampController.findAll();
    console.log(allBootcamps);

    const userById = await userController.findUserById(lucasRojas.id);
    console.log(userById);

    const allUsers = await userController.findAll();
    console.log(allUsers);

    userController.updateUserById(1, {
        firstName: "Pedro",
        lastName: "Sánchez"
    });
    
    userController.deleteUserById(1);
})();

