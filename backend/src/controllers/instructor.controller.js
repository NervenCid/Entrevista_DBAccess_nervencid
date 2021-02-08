//Importamos el modelo
const Instructor = require('../models/InstructorModel');

//Almacenamos en un objeto todas las funciones relacionadas con 'courses'
const InstructorCtrl = {};

//Obtenemos todos los instructores
InstructorCtrl.getInstructors = async(req, res) =>{
    
    //Hacemos la consulta a la base de datos
    try{
        //Consultamos
        const instructors = await Instructor.findAll();
        //Mostramos por consola
        console.log('Listado de Instructores: ', instructors);
        //Enviamos la respuesta via JSON
        res.json(instructors);
    }catch(error){
        console.log("Error en 'getInstructors': ", error);
        res.json({
            "Error en 'getInstructors'": error
        });
    };

};

//Creamos un instructor
InstructorCtrl.createInstructor = async(req, res) =>{

    //Extraemos las propiedades de 'req.body'
    const{name, courseid} = req.body; 
     
    //Guardamos en la base de datos
    try{

        //Creamos un 'newCourse'
        let newInstructor = await Instructor.create({
            name,
            courseid        
        }, {
            //Especificamos los campos
            fields: ['name', 'courseid']
        });

        //Evaluamos si se creo el dato de forma correcta
        if(newInstructor){
            //Mostramos por consola
            console.log('Nuevo instructor registrado: ', req.body);   
            //Enviamos una respuesta al cliente
            res.json({
                "message": "Nuevo instructor registrado",
                "Proyecto": newInstructor
            });
        };

    }catch(error){

        console.log("Error en 'createInstructor': ", error);
        res.json({
            "Error en 'createInstructor'": error
        });
    };

};

//Modificamos un instructor
InstructorCtrl.updateInstructor = async(req, res) =>{

    //Capturamos el 'id'
    const {id} = req.params;

    //Capturamos los datos provenientes del cliente que se actualizaran
    const{name, courseid} = req.body; 

    //Realizamos la operacion en la base de datos
    try{

        //Realizamos una consulta en la base de datos y buscamos un solo elemento por el 'id'
        const instructor = await Instructor.findOne({

            //Obtenemos los atributos
            attributes: ['id', 'name', 'courseid'],

            //Buscamos por 'id'
            where: {id}

        });

        //Mostramos por consola
        console.log("Instructor actualizado: ", instructor);

        //Devolvemos al cliente
        res.json({"Instructor actualizada": instructor});

    }catch(error){

        //Mostramos por consola
        console.log("Error en 'updateInstructor'", error);

        //Devolvemos al cliente
        res.status(500).json({"Error en 'updateInstructor'": error});

    };

};

//Eliminamos un instructor
InstructorCtrl.deleteInstructor = async(req, res) =>{

    //Capturamos el 'id'
    const {id} = req.params;

    //Intentamos hacer la operacion
    try{

        //Consultamos en la base de datos y eliminamos el elemento
        const instructorDeleted = await Instructor.destroy({

             //Eliminamos el elemento con el 'id' indicado
            where: {id}


        });

    }catch(error){

        //Mostramos por consola
        console.log("Error en 'deleteTask'", error);

        //Devolvemos al cliente
        res.status(500).json({"Error en 'deleteTask'": error});

    };

};

//Con esta funcion obtenemos UN SOLO instructor
InstructorCtrl.getOneInstructor = async(req, res) =>{

    //Intentamos hacer la operacion
    try{

        //Realizamos una consulta a la base de datos y obtenemos el dato por el 'id'
        const instructor = await Instructor.findOne({

            //Obtenemos los atributos
            attributes: ['id', 'name', 'courseid'],

            //Buscamos por 'id'
            where: {id}
        });

        //Verificamos que exista el  'instructor'
        if(!instructor){
            //Mostramos por consola
            console.log("El instructor no existe");

            //Devolvemos al cliente
            res.json({"Message": "El instructor no existe"});
        };
        
        //Mostramos por consola
        console.log("Instructor obtenido: ", instructor);

        //Devolvemos al cliente
        res.json({"Instructor obtenido ": instructor});

    }catch(error){

        //Mostramos por consola
        console.log("Error en 'getOneInstructor'", error);

        //Devolvemos al cliente
        res.status(500).json({"Error en 'getOneInstructor'": error});

    };

};

//Con esta funcion se busca TODOS los instructores de un curso determinado
InstructorCtrl.getInstructorByCourse = async(req, res) =>{

     //Capturamos el 'id' del curso
     const {courseid} = req.params;    

     try{

        //Realizamos una consulta y buscamos todos los instructores
        const instructors = await Instructor.findAll({
            //Capturamos los atributos
            attributes: ['id', 'name', 'courseid'],
            //Usamos 'courseid' como parametro de busqueda
            where: { courseid }
        });

        //Mostramos por consola
        console.log(`El curso ${courseid} tiene registrados las siguientes instructores: ${instructors}`);

        //Devolvemos al cliente
        res.json({
            "Curso": courseid, 
            "Instructores Registrados": instructors
        });

     }catch(error){

        //Mostramos por consola
        console.log("Error en 'getInstructorByCourse'", error);

        //Devolvemos al cliente
        res.status(500).json({"Error en 'getInstructorByCourse'": error});

     };

};

//Exportamos el modulo
module.exports = InstructorCtrl;