import React, { useState } from 'react';
import axios from 'axios';
import estilo from "../styles/style.css";
import NavBar from './Navbar.js';
import '../styles/Login.css'; // Importamos el archivo de estilos CSS
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

  const defaultTheme = createTheme();

  return (
    <div>
    <link href={estilo} rel="stylesheet" />
    <NavBar/>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
      <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
      <br />
      <label>
        E-Mail:
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={correo}
              onChange={(e) => setcorreo(e.target.value)}
            />
        <br></br>
        Contraseña
        <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Enviar
        </Button>
        {mostrarMensaje && <p className="red-text">Credenciales incorrectas </p>}
        <Grid container>
          <Grid item>
            <Button
                href="/register"
              >
              No tienes cuenta? Registrate
          </Button>
          </Grid>
        </Grid>
      </label>
      </Box>
      </Box>
    </Container>
    </ThemeProvider>
    </div>
  );
};

export default Formulario;
