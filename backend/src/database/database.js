//Aqui configuramos la conexion de la base de datos

//Llamamos al archivo 'keys'
const keys = require("./keys");

//ANTES QUE NADA CREAR O VERIFICAR LOS NOMBRES DE LA BASE DE DATOS

//Importamos Sequelize como ORM (manejar bases de datos sin importar que sean)
const Sequelize = require('sequelize');

//Creamos una nueva instancia de 'Sequelize' y pasamos la configuracion de la base de datos
const sequelize = new Sequelize(keys.database, keys.user, keys.password, {
    host: keys.host,
    dialect: "mysql",
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

//Creamos un JSON con las instancias y el modelo
//const db = {};
//db.Sequelize = Sequelize;
//db.sequelize = sequelize;

//Exportamos
module.exports = sequelize;