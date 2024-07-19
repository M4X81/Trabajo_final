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

// // Ruta de registro
// //esta funciona bien, los registros se cargan ok en la db
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
app.get('/users', async (req, res) => {
    // const { email } = req.params;
    const email = req.query.email;
    console.log('Received request for email:', email);
    try {
        const user = await pool.query('SELECT * FROM user_profiles WHERE email = $1', [email]);

        if (user.rows.length > 0) {
             res.status(200).json(user.rows[0]);
        }else{
            res.status(404).json({ error: 'Usuario no Enncontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta de ejemplo para verificar la configuración y si funciona de verdad el servidor
app.get('/api', (req, res) => {
    res.send('API está funcionando correctamente');
});

// Middleware para loggear todas las solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

//para modificar(agregar)

app.put('/updateuser', async (req, res) => {
    const email = req.query.email;
    const { password, user_name, lastname, address, phone, country, city } = req.body;

    try {
        const userResult = await pool.query(
            'UPDATE user_profiles SET password = $2, user_name = $3, lastname = $4, address = $5, phone = $6, country = $7, city = $8 WHERE email = $1 RETURNING *',
            [email, password, user_name, lastname, address, phone, country, city]
        );

        if (userResult.rows.length > 0) {
            res.status(200).json(userResult.rows[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//eliminar usuario

app.delete('/users', async (req, res) => {
    // const { email } = req.params;
    const email = req.query.email;
    console.log('Received request for email:', email);
    try {
        const result = await pool.query('DELETE FROM user_profiles WHERE email = $1 RETURNING *', [email]);

        if (result.rows.length > 0) {
            alert("entra aca?")
            console.log('User deleted:', result.rows[0]);
             res.status(200).json({ message: 'Usuario eliminado exitosamente', user: result.rows[0] });
        }else{

            console.log('User not found');
            res.status(404).json({ error: 'Usuario no Enncontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//esto lo cargo para que la navegacion la maneje react y no el servidor
//sino al actualizar o volver hacia atras no encuentra la ruta/pagina y da un 404
// Ruta catch-all para manejar todas las rutas del lado del cliente


// Configurar el servidor para que sirva la aplicación React en todas las rutas no API
app.use(express.static(path.join(__dirname, '..', 'dist')));  

app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'dist','index.html'));//probar en vez de index.html app.js o app.jsx
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

//despues una vez terminado quitar el puerto 3001 por las dudas
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});