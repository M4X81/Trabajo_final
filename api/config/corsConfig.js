const allowedOrigins = [
    'https://trabajo-finalcac.vercel.app',
    'http://localhost:3001',
    'http://localhost:5173',
    'https://trabajo-finalcac.vercel.app/register',
    'https://trabajo-finalcac.vercel.app/#/register',
    'https://trabajo-finalcac.vercel.app/users',
    'https://trabajo-finalcac.vercel.app/#/users',
    'https://trabajo-finalcac.vercel.app/#/users/:email',
    'https://trabajo-finalcac.vercel.app/users/:email',
    'https://trabajo-finalcac.vercel.app/users:email',
    'https://trabajo-finalcac.vercel.app/#/users:email',
    'https://trabajo-finalcac.vercel.app/#/login'
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log("Solicitando desde origen:", origin); // Añadido para verificar el origen
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // El !origin permite solicitudes sin origen, como las de la misma máquina (ej. postman o curl).
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type,Authorization,X-Requested-With,Accept'],
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
