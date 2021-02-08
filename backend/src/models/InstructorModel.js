//Importamos Sequelize como ORM (manejar bases de datos sin importar que sean)
const Sequelize = require('sequelize');

//Importamos la cadena de conexion creada en 'database.js'
const sequelize = require('../database/database');

//Creamos el modelo con los datos de la tabla y sus tipos
//que deben ser LOS MISMOS de la base de datos
const InstructorModel = sequelize.define('instructor',{
    id: {
        type: Sequelize.INTEGER,
        //Esta es la llave primaria
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    courseid:{
        type: Sequelize.INTEGER
    }
}, {
    //Quitamos la asignacion automatica de fechas
    timestamps: false
});

//Exportamos 
module.exports = InstructorModel;