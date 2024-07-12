// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
const corsOptions = require('./config/corsConfig');
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
//esta funciona bien, los registros se cargan ok en la db
app.post('/register', async (req, res) => {
    const { email, password, user_name, lastname, address, phone, country, city } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO user_profiles 
            (email, password, user_name, lastname, address, phone, country, city) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [email, password, user_name, lastname, address, phone, country, city]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agrego ruta para inicio de sesión(reviso la db para validar si el usuario existe)
//el login funciona ok, se ingresa al usuario( pero todavia no esto pudiendo traer los datos 
//de todas las tablas del usuario para desplegar en pantalla)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM user_profiles WHERE email = $1 AND password = $2',
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


//me traigo los datos del usuario para la pag user( asi cuando cargo los datos de la nueva tabla se a que usuario estoy modificando)
//esta la tengo que testear a ver si funciona bien...
// app.get('/register:email', async (req, res) => {
app.get('/users/:email', async (req, res) => {
    const { email } = req.params;

    // try {
    //     const userResult = await pool.query(
    //         'SELECT id FROM user_profiles WHERE email = $1',
    //         [email]
    //     );

    //     if (userResult.rows.length === 0) {
    //         return res.status(404).json({ error: 'Usuario no encontrado' });
    //     }

    //     const userId = userResult.rows[0].id;
    //     const profileResult = await pool.query(
    //         'SELECT * FROM user_profiles WHERE user_id = $1',
    //         [userId]
    //     );

    //     if (profileResult.rows.length === 0) {
    //         return res.status(404).json({ error: 'Perfil de usuario no encontrado' });
    //     }

    //pruebo esto

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(profileResult.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//para modificar(agregar)
// Ruta para actualizar datos del perfil del usuario
// app.put('/users:email', async (req, res) => {
// app.put('/users/:email', async (req, res) => { //ver bien esta ruta si es /users o /users/:email
//     const { password, user_name, lastname, address, phone, country, city } = req.body;

//     try {
//         const userResult = await pool.query(
//             'SELECT id FROM user_profiles WHERE email = $1',
//             [email]
//         );

//         if (userResult.rows.length === 0) {
//             return res.status(404).json({ error: 'Usuario no encontrado' });
//         }

//         const userId = userResult.rows[0].id;

//         const profileResult = await pool.query(
//             `INSERT INTO user_profiles (user_id, password, user_name, lastname, address, phone, country, city)
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//              ON CONFLICT (user_id) DO UPDATE SET
//              password = EXCLUDED.password,
//              username = EXCLUDED.user_name,
//              lastname = EXCLUDED.lastname,
//              address = EXCLUDED.address,
//              phone = EXCLUDED.phone,
//              country = EXCLUDED.country,
//              city = EXCLUDED.city
//              RETURNING *`,
//             [userId, password,user_name, lastname, address, phone, country, city]
//         );

//         res.status(200).json(profileResult.rows[0]);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.put('/users/:email', async (req, res) => {
    const { email } = req.params;
    const { password, user_name, lastname, address, phone, country, city } = req.body;

    try {
        const userResult = await pool.query(
            'UPDATE user_profiles SET password = $1, user_name = $2, lastname = $3, address = $4, phone = $5, country = $6, city = $7 WHERE email = $8 RETURNING *',
            [password, user_name, lastname, address, phone, country, city, email]
        );

        res.status(200).json(userResult.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//esto lo cargo para que la navegacion la maneje react y no el servidor
//sino al actualizar o volver hacia atras no encuentra la ruta/pagina y da un 404
// Ruta catch-all para manejar todas las rutas del lado del cliente


// Configurar el servidor para que sirva la aplicación React en todas las rutas no API
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'app.js'));
});

//esta tengo que ver bien si "redirijo" a app.js o a index.html
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'app.js');
    console.log(`Enviando archivo: ${filePath}`);
    res.sendFile(filePath);
});


//despues una vez terminado quitar el puerto 3001 por las dudas
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});