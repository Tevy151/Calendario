import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoUSM from '../media/usm.png'

const theme = createTheme({
  palette: {
    primary: {
      main: '#A0AECD',
    },
  },
});



function Navbar() {
    const buttonStyle = {
        color: 'white', 
      };
    const token = localStorage.getItem('token');
    const sesion = token ? true : false; // Verificar si existe el token
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img src={LogoUSM} alt="Logo" width="40" height="40" />
          </Link>
          <Link to="/calendario">
            <Button style={buttonStyle}>Calendario</Button>
          </Link>
          <Link to="/nosotros">
            <Button style={buttonStyle}>Nosotros</Button>
          </Link>
          <div style={{ marginLeft: 'auto' }}></div>
          {sesion ? (
            <Link to="/logout">
            <Button style={buttonStyle}>Cerrar sesión</Button>
          </Link>
          ) : (
            <Link to="/login">
            <Button style={buttonStyle}>Ingresar</Button>
          </Link>
          )

          }
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
