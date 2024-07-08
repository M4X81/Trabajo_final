// /**
//  * El objetivo de este trabajo 
//  * es proporcionar una práctica introductoria 
//  * para el desarrollo de autientificación de usuarios 
//  * utilizando Node.js y los frameworks Express, Bcrypt y JsonWebToken.
//  * Aplicamos los siguientes pasos
//  * 1- Diseñamos la estructura de carpetas
//  * 2- Inicializamos NPM: npm init -y
//  * 3- Instalamos las dependencias: npm i express bcryptjs jsonwebtoken router
// * 4- Configuramos el servidor en index.js
//  * 5- Configurar start
//  * 6- Para compatibilizar con un front de puerto 5000 importar cors
//  */

// //Importamos express
// const express = require("express");

// //Creamos instancia de express
// const app = express();

// //Importamos cors
// const cors = require("cors");

// // Importa las rutas de autenticación
// const authRoutes = require('./routes/authRoutes');



// //FUTURA CONEXION CON FRONT
// //instalamos npm i cors y npm i dotenv


// //Importamos dotEnv
// require("dotenv").config(); // ó const dotenv = require("dotenv") //dotenv.config    
// //Definimos puerto
// const PORT = process.env.PORT || 3001;
// console.log("Puerto definido:", process.env.PORT);

// //MIDDLEWARE DE CONEXION DE PUERTOS DIFERENTES
// //aca ponemos en funcionamiento cors
// //Middleware que permite conexiones de puertos distintos por ejemplo de un front port 5000
// //IMPORTANTE al desplegar en la web no incluir la linea cors
// app.use(cors());
// console.log("cors inicializado");

// //Middleware para analizar Json entrantes
// app.use(express.json());
// console.log("Servidor está iniciando...");

// //Codificar la ruta ppal
// // app.use("/auth",authRoutes); asi lo dio en la clase
// app.use('/auth', (req, res, next) => {
//     console.log(`Ruta de autenticación llamada: ${req.method} ${req.path}`);
//     next();
// }, authRoutes);

// //Inicializamos el server
// app.listen(PORT, ()=>{console.log(`Servidor escuchando en el puerto: ${PORT}`)});

// console.log("Servidor iniciado correctamente.");

// //Pasamos a config

// src/app.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
console.log("cors inicializado");
app.use(express.json());
console.log("Servidor está iniciando...");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


pool.connect(err => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conectado a la base de datos con éxito');
    }
  });

// Ruta de registro
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log("Puerto definido:", process.env.PORT);
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });