// /***
//  * Nota: A los fines de centrar el ejercicio en JWT, 
//  * almacenaremos los usuarios en memoria. 
//  * En un proyecto real, 
//  * los usuarios deben almacenarse en base de datos.
//  * Es decir este archivo o archivos que resulten, 
//  * manejarían la logica de gestión con la bbdd
//  * * */

// // Creamos del array ( esto es para guardar en local, pero habria q hacerlo configurando la db)
// const users = [];

// //Exportamos el array
// module.exports = users;

// // Pasamos a configurar el controlador de autentificación authController.js carpeta controllers

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Función para registrar un nuevo usuario
const registerUser = async (email, password) => {
    try {
        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de hash

        // Insertar usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        return result.rows[0]; // Devolvemos el usuario insertado
    } catch (error) {
        throw error;
    }
};

// Función para encontrar un usuario por su email
const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        return result.rows[0]; // Devolvemos el usuario encontrado o null si no existe
    } catch (error) {
        throw error;
    }
};

// Exportamos las funciones para su uso en otros módulos
module.exports = {
    registerUser,
    findUserByEmail
};

