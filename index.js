require('dotenv').config();
// g87IuMdo72GJOoR6
// mean_user
const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

//Base de datos
dbConnection();

console.log(process.env);

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})