import React from 'react';
import style from '../styles/pag.css';
import NavBar from './Navbar.js';
import USM from '../media/usm.png'

export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <link rel="stylesheet" type="text/css" href={style}></link>
        
        <div class="contenedor-imagen">
          
          <img src={USM} alt="Descripción de la imagen" height='300px'></img>
      
        </div>
        <div className="container">
          
          <h3>Bienvenido</h3>


        </div>

      </div>
    </div>
  );
}

export default HomePage;
