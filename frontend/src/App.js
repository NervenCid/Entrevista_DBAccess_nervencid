//Importamos React
import React from 'react';
//Importamos el enroutador asegurarse que 'react-router-dom' este instalado
import {BrowserRouter as Router, Route} from 'react-router-dom';
//Importamos 'booststrap' asegurarse que este instalado en 
//la carpeta'node-modules' del proyecto
import 'bootstrap/dist/css/bootstrap.min.css';
//Importamos 'bootswatch'
//import 'bootswatch/dist/darkly/bootstrap.min.css';
//Importamos el estilo css
import './App.css';
import logo from './logo.svg';

//Importamos los componentes
import Navigation from './components/Navigation';
import InstructorList from './components/InstructorList';
import CreateInstructor from './components/CreateInstructor';
import CreateCourse from './components/CreateCourse';


function App() {
  return (
    <div>
      <Router>
        <Navigation/>
        <div className="container p-4">
          {/*Creamos las rutas*/}
          {/*Con 'exact' evitamos que se rendericen otras rutas que contengan '/'*/}
          <Route path="/" exact component={InstructorList} />
          <Route path="/edit/:id" component={CreateInstructor} />
          <Route path="/create" component={CreateInstructor} />
          <Route path="/course" component={CreateCourse} />
        </div>
      </Router>
    </div>
  );
}

export default App;
