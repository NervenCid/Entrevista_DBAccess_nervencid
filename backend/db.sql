/*VERIFICAR PRIMERO QUE EXISTA LA BASE DE DATOS*/

/*En este caso un 'instructor' puede tener varios 'courses'*/

/*Creamos las tablas*/

/*La tabla se crea si no existe*/
/*Tabla 'courses'*/
/*La tabla se crea si no existe en caso de que ya exista y desee 
eliminirla, descomentar el siguiente comando y ejecutarlo:*/
/*DROP TABLE IF EXISTS courses;*/
CREATE TABLE IF NOT EXISTS courses(
    /*Creamos un 'id' tipo 'integer' que sera la llave primaria que sera generado por defecto como identidad
    es decir permite asignarle un valor unico a la columna*/
    id INTEGER AUTO_INCREMENT PRIMARY KEY,   
    /*Creamos un 'name' tipo texto no nulo donde se verificara que no se introduzca un string vacio*/
    name TEXT NOT NULL CHECK (name <> ''),
    /*Creamos un 'courseperiod' no nulo*/
    courseperiod DATE NOT NULL
);

/*La tabla se crea si no existe*/
/*Tabla 'instructors'*/
/*La tabla se crea si no existe en caso de que ya exista y desee 
eliminirla, descomentar el siguiente comando y ejecutarlo:*/
/*DROP TABLE IF EXISTS instructors;*/
CREATE TABLE IF NOT EXISTS instructors(
    /*Creamos un 'id' tipo 'integer' que sera la llave primaria que sera generado por defecto como identidad
    es decir permite asignarle un valor unico a la columna*/
    id INTEGER AUTO_INCREMENT PRIMARY KEY,    
    /*Creamos un 'name' tipo texto no nulo donde se verificara que no se introduzca un string vacio*/
    name TEXT NOT NULL CHECK (name <> ''),
    /*Creamos un 'instructorid' que se relacionara con el 'id' de la tabla 'instructors'*/
    courseid INTEGER REFERENCES courses(id) 
);

/*Ver la tabla*/

DESCRIBE courses;
DESCRIBE instructors;
