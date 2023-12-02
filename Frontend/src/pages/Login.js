import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import estilo from "../styles/style.css";
import NavBar from './Navbar.js';
import '../styles/Login.css'; // Importamos el archivo de estilos CSS

const API = "http://localhost:3001"

const Formulario = () => {
  const [password, setpassword] = useState('');
  const [correo, setcorreo] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    try {
      // Realizar la solicitud al backend usando Axios (o Fetch API)
      const responses = await axios.post(`${API}/Login/`, {
        correo: correo,
        contraseña: password,
      })
      .then(response => {
        // Manejar la respuesta exitosa del backend        
        const token = response.data.token
        localStorage.setItem('token', token)
        console.log('Respuesta exitosa:', token);
        window.location.href = 'http://localhost:3000/';
      })
      .catch(error => {
        // Manejar errores de la solicitud
        if (error.response) {
          setMostrarMensaje(true);
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error('Error de respuesta:', error.response.status);
          console.error('Mensaje de error:', error.response.data);
        } else if (error.request) {
          // No se recibió una respuesta del servidor
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          // Ocurrió un error al configurar la solicitud
          console.error('Error al configurar la solicitud:', error.message);
        }
      });
    } catch (error) {
      // Manejar errores de la solicitud al backend
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
    <NavBar/>
    <div class="container">
      <link href={estilo} rel="stylesheet" />
      
    <form onSubmit={handleSubmit}>
      <br />
      <label>
        E-Mail:
        <input
          type="email"
          value={correo}
          onChange={(e) => setcorreo(e.target.value)}
        />
      </label>
      <br />
      <label>
        Contraseña:
        <input
          type="String"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
      {mostrarMensaje && <p>Credenciales incorrectas </p>}
      <Link to="/">
          <button type="button">Volver</button>
      </Link>
      <Link to="/register">
          <button type="button">Registrar</button>
      </Link>
    </form>
    </div>
    </div>
  );
};

export default Formulario;
