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
        
        <div class="contenedor-imagen">
          <img src={LOGO} alt="Descripción de la imagen" height='250px'></img>
        </div>

        <div className="container">
          <h3>SuChoripan</h3>
          <div>Hola somos SuChoripan</div>
        </div>

      </div>
    </div>
  );
}

export default About;
