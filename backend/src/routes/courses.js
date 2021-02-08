//Importamos el 'Router' de 'express'
const {Router} = require('express');

//Importamos el controlador
const{
    getCourses,
    createCourse,
    deleteCourse} = require('../controllers/course.controller');

//Creamos un enrutador
const router = Router();

/*Las rutas pueden ser:

localhost:3000/api/courses
localhost:3000/api/courses/:id

*/

//Creamos una ruta con el metodo GET con 'getCourses'
router.get('/', getCourses);

//Creamos una ruta con el metodo POST con 'createCourse'
router.post('/', createCourse);

//Creamos una ruta con el metodo DELETE con 'deleteCourse' PERO USAMOS el 'id' para eliminar colo UN elemento
router.delete('/:id', deleteCourse);

//Exportamos el modulo
module.exports = router;