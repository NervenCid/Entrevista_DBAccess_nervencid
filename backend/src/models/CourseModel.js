//Importamos Sequelize como ORM (manejar bases de datos sin importar que sean)
const Sequelize = require('sequelize');

//Importamos la cadena de conexion creada en 'database.js'
const sequelize = require('../database/database');

//Importamos el 'InstructorModel'
const InstructorModel = require('./InstructorModel');

//Creamos el modelo con los datos de la tabla y sus tipos
//que deben ser LOS MISMOS de la base de datos
const CourseModel = sequelize.define('course', {
    id: {
        type: Sequelize.INTEGER,
        //Esta es la llave primaria
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    courseperiod: {
        type: Sequelize.DATE
    }
}, {
    //Quitamos la asignacion automatica de fechas
    timestamps: false
});

//Relacionamos con el modelo 'TaskModel'
//Como un curso puede tener varios instructores decimos que es una relacion uno a muchos
CourseModel.hasMany(InstructorModel,
    //Decimos que la llave foranea 'foreignKey' de 'TaskModel' es 'projectId' para hacer la relacion
    //con el 'sourceKey' de 'ProjectModel' que es 'id'
    {
        foreignKey: 'courseid',
        sourceKey: 'id'
    }
);

//Exportamos 
module.exports = CourseModel;