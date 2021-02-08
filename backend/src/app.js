//Importamos express
const express=require('express');

//Modulo para manejar rutas del sistema
const path = require('path');

//Importamos 'morgan'
const morgan = require('morgan')

//Importamos 'cors'
const cors = require('cors');

//Ejecutamos 'express' y creamos la aplicacion
const app = express();

//------------------------------------------Configuraciones------------------------------------------

//Configuramos el puerto
app.set('port', process.env.PORT||4000);

//-------------------------------------------Middlewaress--------------------------------------------

//Configuramos 'morgan' en modo 'dev' para recibir mensajes de estado del servidor
app.use(morgan('dev'));

//Permitimos la comunicacion estre dos servidores en este caso con el servidor de react
app.use(cors());

//Habilitamos que el servidor entienda formato 'json'
app.use(express.json());

//----------------------------------------------Rutas------------------------------------------------

//Usamos las rutas

//Agregamos a la URL el prefijo '/api/courses'
app.use('/api/courses', require('./routes/courses'));

//Agregamos a la URL el prefijo '/api/instructors'
app.use('/api/instructors', require('./routes/instructors'));

//---------------------------------------------------------------------------------------------------

//Exportamos el modulo
module.exports=app;
