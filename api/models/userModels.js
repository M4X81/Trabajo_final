/***
 * Nota: A los fines de centrar el ejercicio en JWT, 
 * almacenaremos los usuarios en memoria. 
 * En un proyecto real, 
 * los usuarios deben almacenarse en base de datos.
 * Es decir este archivo o archivos que resulten, 
 * manejarían la logica de gestión con la bbdd
 * * */

// Creamos del array ( esto es para guardar en local, pero habria q hacerlo configurando la db)
const users = [];

//Exportamos el array
module.exports = users;

// Pasamos a configurar el controlador de autentificación authController.js carpeta controllers
