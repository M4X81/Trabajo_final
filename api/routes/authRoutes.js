/**
 * Estas rutas permiten a los usuarios registrarse, 
 * iniciar sesión y acceder a recursos protegidos 
 * de manera segura utilizando JWT para la autenticación.
 */

// Importamos el controlador express
const express = require('express');

// Importar el controlador de autenticación
const authController = require('../controllers/authControllers');

// Importar el middleware de autenticación
const authMiddleware = require('../middlewares/authMiddleware');

// Crear una nueva instancia de Router
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión con un usuario existente
router.post('/login', authController.login);

// Ruta protegida que requiere autenticación previa del usuario.
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Hola usuario ${req.userId} - ${req.username}`);    
});



module.exports = router; // Exporta el router para que pueda ser utilizado en otros archivos