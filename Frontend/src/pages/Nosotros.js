import React from 'react';
import NavBar from './Navbar.js';
import style from '../styles/pag.css';
import LOGO from '../media/logo.png'

export const About = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <link rel="stylesheet" type="text/css" href={style}></link>
        
        <div className="contenedor-imagen">
          <img src={LOGO} alt="Descripción de la imagen" height='250px'></img>
        </div>

        <div className="container">
          <h3>SuChoripan</h3>
          <p>Hola somos SuChoripan, un grupo de alumnos de la USM. Somos los responsables detras de esta aplicación como parte de un proyecto de la asignatura Ingeniería, Informatica y Sociedad</p>
          <br></br>
          <h3>Integrantes:</h3>
          <p>José Campos</p>
          <p>Sebastián Sandoval</p>
          <p>Vicente Mackenzie</p>
          <p>Cristobal Guerrero</p>
          <p>Felipe González</p>
          <p>Francisco Muñoz</p>
        </div>

      </div>
    </div>
  );
}

export default About;
