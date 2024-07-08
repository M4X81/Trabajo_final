/**
 * Este archivo contiene la configuración necesaria 
 * para manejar los tokens JWT en la aplicación. 
 * Incluye la clave secreta utilizada para firmar los tokens 
 * y la duración de validez de los tokens.
 */

module.exports = {
    secretKey: "password",
    tokenExpiresIn: "1h"
};

// La clave se usa luego en la función jwt.sign() 
// para crear el token y en jwt.verify() para verificar 
// la validez del token.

// Pasamos a configurar el modelo de usuarios en userModels.js