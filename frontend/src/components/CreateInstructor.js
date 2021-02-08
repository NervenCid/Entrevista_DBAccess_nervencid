//Importamos React
import React, { Component } from 'react'
//Importamos 'axios' (instalarlo primero, via npm)
import axios from 'axios'
//Importamos 'datepicker' (instalarlo primero, via npm)
//npm install react-datepicker --save
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//Creamos una 'URL' verificar primero
//Verificar el puerto del servidor en este caso se esta usando el puerto 4000
//const URL = 'http://localhost:4000';
const URL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:4000';
console.log('URL: ', URL);

//Creamos y exportamos el componente
export default class CreateInstructor extends Component {
    //Creamos un estado
    state = {
        courses: [],
        courseid: '',
        courseSelected: '',
        name: '',
        editing: false,
    };

    //Este metodo ejecuta funciones una vez ha sido montado
    async componentDidMount() {       
        
        //Hacemos peticiones HTTP usando 'axios'
        const res_courses = await axios.get(`${URL}/api/courses`);

        //Modificamos el estado
        this.setState({
            //courses: res_courses.data.map(course => course.name),
            courses: res_courses.data.map(course => [course.id, course.name]),
            courseSelected: res_courses.data[0].coursename
        });
        
        //Si existe 'this.props.match.params.id' quiere decir que
        //lo que hara el usuario es una edicion luego cambiamos
        //el estado en 'editing' a 'true' y asiganmos el 'id'
        //de la nota que se desee editar
        /*
        if(this.props.match.params.id){
            //Hacemos una peticion 'get' para llenar el formulario a llenar
            const res_instructor = await axios.get(`${URL}/api/instructors/${this.props.match.params.id}`);
            console.log(res_instructor.data.id);
            //Cambiamos el estado
            this.setState({
                name: res_instructor.data.name,               
                courseSelected: res_instructor.data.author,
                editing: true,
                id: this.props.match.params.id
            })
        }
        */
    }; 
    
    //Con este metodo se guarda el instructor
    onSubmit = async (e) => {
        //Evitamos que por defecto se refresque la pagina
        e.preventDefault();
        //Creamos la nota y cambiamos el estado
        const newInstructor = {
            name: this.state.name,
            courseid: this.state.courseid
        };
        
        //Si el estado 'editing' es 'true' hacemos edicion
        //si no creamos una nueva nota
        //Para EDITAR usamos 'put' y para CREAR usamos 'post'
        if(this.state.editing){
            //Enviamos al backend
            //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
            await axios.put(`${URL}/api/instructors/${this.state.id}`, newInstructor);
        }else{
            //Enviamos al backend
            //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
            await axios.post(`${URL}/api/instructors`, newInstructor);
            //console.log(newInstructor);
        }
        //Nos ubicamos en la direccion raiz
        //window.location.href = '/';
    };

    //Escuchamos cuando se cambie la seleccion del curso en el desplegable
    //de cursos
    onInputChangeCourse = (e) => {
        
        //Cambiamos el estado
        this.setState({
            courseid: e.target.value.split(",")[0],            
        });

    };
    //Escuchamos cuando se cambie el texto del instructor
    //de cursos que se les asigna un instructor
    onInputChange = (e) => {
        
        //Cambiamos el estado
        this.setState({
            [e.target.name]: e.target.value,            
        });

    };

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Asignar un instructor</h4>
                    {/*Seleccionar una Lista de todos los cursos*/}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="courseSelected"
                            onChange={this.onInputChangeCourse}
                            value={this.state.courseSelected}
                        >
                            {/*Recorremos el arreglo 'courses' y los agregamos a al elemento 'option'*/}
                            {
                                this.state.courses.map(course => 
                                    <option key={course}
                                            value={course}>
                                        {course[1]}
                                    </option>)
                            }
                        </select>
                    </div>
                    {/*Nombre del instructor*/}
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-cpntrol"
                            placeholder="Nombre del instructor"
                            name="name"
                            onChange={this.onInputChange}
                            value={this.state.name}
                            required
                        />
                    </div>                    
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Guardar asignacion Instructor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
