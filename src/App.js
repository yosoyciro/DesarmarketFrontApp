import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import MenuAppBar from './components/Navegacion/MenuAppBar';
import Login from './components/Seguridad/Login';
import RegistrarUsuario from './components/Seguridad/RegistrarUsuario';
import theme from './theme/theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Libro from './components/Pantallas/Libro';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MenuAppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrar" component={RegistrarUsuario} />
          <Route exact path="/" component={Libro} />
        </Switch>
      </Router>
    </ThemeProvider>        
  );
}

export default App;
