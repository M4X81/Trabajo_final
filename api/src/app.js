// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
const corsOptions = require('../config/corsConfig');
require('dotenv').config();

const app = express();
app.use(cors(corsOptions));
console.log("cors inicializado");
app.use(express.json());
console.log("Servidor está iniciando...");

const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: true//lo tenia en false
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
app.post('/register', async (req, res) => {
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

  // Agrego ruta para inicio de sesión(reviso la db para validar si el usuario existe)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            // Usuario autenticado correctamente
            res.status(200).json({ message: 'Inicio de sesión exitoso', user: result.rows[0] });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  //esto lo cargo para que la navegacion la maneje react y no el servidor
  //sino al actualizar o volver hacia atras no encuentra la ruta/pagina y da un 404

// Ruta catch-all para manejar todas las rutas del lado del cliente

app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'app.jsx');
    console.log(`Enviando archivo: ${filePath}`);
    res.sendFile(filePath);
});

//me traigo los datos del usuario para la pag user( asi cuando cargo los datos de la nueva tabla se a que usuario estoy modificando)
// app.get('/users:email', async (req, res) => {
app.get('/users', async (req, res) => {
    const { email } = req.params;

    try {
        const userResult = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const userId = userResult.rows[0].id;

        const profileResult = await pool.query(
            'SELECT * FROM user_profiles WHERE user_id = $1',
            [userId]
        );

        if (profileResult.rows.length === 0) {
            return res.status(404).json({ error: 'Perfil de usuario no encontrado' });
        }

        res.status(200).json(profileResult.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//para modificar(agregar)
// Ruta para actualizar datos del perfil del usuario
// app.put('/users:email', async (req, res) => {
app.put('/users', async (req, res) => {
    const { email, username, lastname, address, phone, country, city } = req.body;

    try {
        const userResult = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const userId = userResult.rows[0].id;

        const profileResult = await pool.query(
            `INSERT INTO user_profiles (user_id, username, lastname, address, phone, country, city)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (user_id) DO UPDATE SET
             username = EXCLUDED.username,
             lastname = EXCLUDED.lastname,
             address = EXCLUDED.address,
             phone = EXCLUDED.phone,
             country = EXCLUDED.country,
             city = EXCLUDED.city
             RETURNING *`,
            [userId, username, lastname, address, phone, country, city]
        );

        res.status(200).json(profileResult.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });