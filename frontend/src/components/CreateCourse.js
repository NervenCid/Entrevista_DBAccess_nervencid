//Importamos React
import React, { Component } from 'react'
//Importamos 'axios' (instalarlo primero, via npm)
import axios from 'axios';
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
export default class CreateCourse extends Component {

    //Creamos un estado
    state = {
        courses: [],
        name:'',
        courseperiod: new Date()
    };

    //Obtenemos los datos de usuario
    //Este metodo ejecuta funciones una vez ha sido montado
    async componentDidMount(){
        //Obtenemos los cursos
        this.getCourses();
        console.log(this.state.courses);        
    };

    //Obtenemos los usuarios con este metodo
    getCourses = async() => {
        //Hacemos peticiones HTTP usando 'axios'
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        const res = await axios.get(`${URL}/api/courses`);
        console.log('Aqui estoy', res);
        //Almacenamos la propiedad 'data' en el estado
        this.setState({ courses: res.data });
    };

    //Con este evento escuchamos y cambiamos la fecha en el calendario de 'DatePicker'
    onChangeDate = (courseperiod) => {
        //Cambiamos el estado
        this.setState({courseperiod});
    };

    //Escuchamos cuando el usuario escriba
    onChangeCoursename = (e) => {
        console.log(e.target.value);
        //Cambiamos el estado
        this.setState({
            name: e.target.value
        });
    };

    //Este metodo sirve para escuchar el evento del boton 'Guardar'
    onSubmit = async e => {
        //Evitamos que por defecto se refresque la pagina
        e.preventDefault();
        //Hacemos una peticion post para enviar los datos
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        await axios.post(`${URL}/api/courses`, {
            name: this.state.name,
            courseperiod: this.state.courseperiod
        });
        ////Obtenemos los usuarios para mostrarlos cada vez que sea creado un usuario nuevo
        this.getCourses();
        //Vaciamos la caja de texto
        this.setState({name:''});
    };

    //Borramos el usuario al hacer dobleclick (ver el evento mas abajo)
    deleteCourse = async (id) =>{
        //console.log(id)
        //Eliminamos el usuario
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        await axios.delete(`${URL}/api/courses/${id}`);
        //Actualizamos la tabla
        this.getCourses();
    };

    render() {
        return (
            <div className = "row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear nuevo Curso</h3>                        
                        {/*Titulo de la nota*/}
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-cpntrol"
                                placeholder="Titulo"
                                name="title"
                                onChange={this.onChangeCoursename}
                                value={this.state.name}
                                required
                            />
                        </div>                        
                        {/*Agregamos un calendario*/}
                        <br></br>
                        <div className="form-group">
                            <DatePicker 
                                className="form-control"
                                selected={this.state.courseperiod} 
                                onChange={this.onChangeDate}
                                />
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-primary">
                                    Crear curso
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className = "list-group">
                        {/*Recorremos el estado para obtener los cursos y mostrarlos
                        con el evento 'onDoubleClick' eliminamos el cursos al hacer doble click*/}
                        {
                            this.state
                                .courses.map(course => (
                                    <li className="list-group-item list-group-item-action"
                                                    key = {course}
                                                    onDoubleClick={() => this.deleteCourse(course)}>
                                                        {course.name}
                                                        <br></br>
                                                        {course.courseperiod}
                                                    </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
