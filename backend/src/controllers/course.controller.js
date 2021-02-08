//Importamos el modelo
const Course = require('../models/CourseModel');

//Almacenamos en un objeto todas las funciones relacionadas con 'courses'
const courseCtrl = {};

//Obtenemos todos los cursos
courseCtrl.getCourses = async(req, res) =>{
    
    //Hacemos la consulta a la base de datos
    try{
        //Consultamos
        const courses = await Course.findAll();
        //Mostramos por consola
        console.log('Listado de cursos: ', courses);
        //Enviamos la respuesta via JSON
        res.json(courses);
    }catch(error){
        console.log("Error en 'getCourses': ", error);
        res.json({
            "Error en 'getCourses'": error
        });
    }

};

//Cremos un nuevo curso
courseCtrl.createCourse = async(req, res) =>{

    //Extraemos las propiedades de 'req.body'
    const{name, courseperiod} = req.body; 
    console.log('Estoy aqui', req.body);
    //Guardamos en la base de datos
    try{

        //Creamos un 'newCourse'
        let newCourse = await Course.create({
            name,
            courseperiod            
        }, {
            //Especificamos los campos
            fields: ['name', 'courseperiod']
        });

        //Evaluamos si se creo el dato de forma correcta
        if(newCourse){
            //Mostramos por consola
            console.log('Nuevo curso creado: ', req.body);   
            //Enviamos una respuesta al cliente
            res.json({
                "message": "Nuevo curso creado",
                "Proyecto": newCourse
            });
        };

    }catch(error){
        console.log("Error en 'createCourse': ", error);
        res.json({
            "Error en 'createCourse'": error
        });
    };

};

//Eliminamos un curso
courseCtrl.deleteCourse = async(req, res) =>{

    //Extraemos el 'id' de 'req.params'
    const {id} = req.params;

    //Realizamos la consulta en la base de datos
    try{

        //Reealizamos la consulta y eliminamos
        //Esto solo nos devuelve la cantidad de elementos eliminados
        const deleteRowCount = await Course.destroy({
            where:{
                //Usamos el 'id' como parametro
                id: id
                }
        });

    }catch(error){
        console.log("Error en 'deleteCourse': ", error);
        res.json({
            "Error en 'deleteCourse'": error
        });
    };
    
};

//Exportamos el modulo
module.exports = courseCtrl;