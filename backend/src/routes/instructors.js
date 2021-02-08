//Importamos el 'Router' de 'express'
const {Router} = require('express');

//Importamos el controlador
const{
    getInstructors,
    getOneInstructor,
    getInstructorByCourse,
    createInstructor,
    updateInstructor,
    deleteInstructor
} = require('../controllers/instructor.controller');

//Creamos un enrutador
const router = Router();

/*Las rutas pueden ser:

localhost:3000/api/instructors
localhost:3000/api/instructors/:id

*/

//Creamos una ruta con el metodo GET con 'getCourses'
router.get('/', getInstructors);

//Creamos una ruta con el metodo GET con 'getOneInstructor'
router.get('/', getOneInstructor);

//Creamos una ruta con el metodo GET con 'getInstructorByCourse'
router.get('/courses/:courseid', getInstructorByCourse);

//Creamos una ruta con el metodo POST con 'createInstructor'
router.post('/', createInstructor);

//Creamos una ruta con el metodo PUT con 'updateInstructor'
router.post('/', updateInstructor);

//Creamos una ruta con el metodo DELETE con 'deleteInstructor'
router.post('/', deleteInstructor);

//Exportamos el modulo
module.exports = router;