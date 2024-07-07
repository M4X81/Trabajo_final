import React from 'react';
import { useAuth } from '../context/authContext';

export default function Users() {
    const {username} = useAuth();
    return (
    
    <div>
      <h4>Completar perfil de usuario de {`${username.split('@')[0]}`}</h4>
<div class="container">
    <h1>Registro</h1>
    <form id="registerForm">
        <label for="regUsername">Usuario:</label>
        <input type="text" id="regUsername" name="username" required></input><br></br>
        <label for="regPassword">Contraseña:</label>
        <input type="text" id="regPassword" name="password" required></input><br></br>
        <button type="submit">Registrarse</button>
    </form>
</div>

<div className="container">
    <h1>Iniciar Sesión</h1>
    <form id="loginForm">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required></input><br></br>
        <label for="password">Contraseña:</label>
        <input type="text" id="password" name="password" required></input><br></br>
        <button type="submit">Iniciar Sesión</button>
    </form>
</div>

<div class="container">
    <h1>Ruta Protegida</h1>
    <button id="accessProtectedRouteBtn">Acceder a Ruta Protegida</button>

    <div id="response"></div>
</div>

    </div>
  )
}
