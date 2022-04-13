const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config()
//Creando el servidor de express
const app = express();

// CORS
app.use(cors());

//Base de datos
dbConnection();

//Lecturas y parseo del body
app.use (express.json());
//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/sanctions', require('./routes/sanctions'));

//Directorio publico
app.use(express.static('public'))

app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
} );
