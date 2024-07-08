const allowedOrigins = [
    'https://trabajo-finalcac.vercel.app',
    'http://localhost:3001',
    'https://trabajo-finalcac.vercel.app/api/register'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // El !origin permite solicitudes sin origen, como las de la misma máquina (ej. postman o curl).
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET,POST,PUT,DELETE,OPTIONS'],
    allowedHeaders: ['Content-Type,Authorization,X-Requested-With,Accept'],
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
