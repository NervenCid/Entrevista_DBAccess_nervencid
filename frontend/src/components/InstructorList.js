//Importamos React
import React, { Component } from 'react'
//Importamos 'axios' (instalarlo primero, via npm)
import axios from 'axios'
//Importamos 'timeago' (instalarlo primero, via npm)
//>npm install timeago.js
import {format} from 'timeago.js'
//Importamos 'Link' que permite usar un componente 'Link' 
import { Link } from 'react-router-dom'

//Creamos una 'URL' verificar primero
//Verificar el puerto del servidor en este caso se esta usando el puerto 4000
//const URL = 'http://localhost:4000';
const URL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:4000';
console.log('URL: ', URL);

//Creamos y exportamos el componente
export default class InstructorList extends Component {
    //Creamos un estado
    state = {
        instructors: []
    };

    //Este metodo ejecuta funciones una vez ha sido montado
    async componentDidMount() {
        //Obtenemos los instructores
        this.getInstructors();           
    };

    //Con esta funcion obtenemos las instructores disponibles
    async getInstructors(){

        //Hacemos peticiones HTTP usando 'axios'
        const res = await axios.get(`${URL}/api/instructors`);
        console.log("Instructors: ", res.data);
        //Cambiamos el estado
        this.setState({ instructors: res.data });     
    };

     //Con esta funcion obtenemos los cursos
     async getCourses(){

     };

    //Este metodo sirve para eliminar un instructor
    deleteInstructor = async (instructorId)=>{
        //console.log(instructorId)
        //Hacemos peticiones HTTP usando 'axios'
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        await axios.delete(`${URL}/api/instructor/${instructorId}`);
        //Actualizamos la interfaz   
        this.getInstructor();     
    };


    render() {
        return (
            <div className="row">
                {/*Recorremos los datos almacenados en el 'state'*/}
                {/*No olvidar declarar una 'key'*/}                
                {
                    this.state.instructors.map(instructor =>(
                        <div className="col-md-4 p-2" key={instructor.id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{instructor.name}</h5>
                                    <Link className="btn btn-secondary" to={"/edit/"+ instructor.name}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{instructor.name}</p>
                                    <p>{instructor.name}</p>
                                    <p>{format(instructor.name)}</p>
                                </div>
                                {/*Boton para borrar la nota*/}
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(instructor.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
