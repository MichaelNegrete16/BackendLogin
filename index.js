const express =  require('express')
require('dotenv').config()
const {dbConection} = require('./DB/config')
const cors = require('cors')


// Crear el servidor de exprees
const app = express()

// Declarar Coor para poder consumir el backend
app.use(cors())

// Iniciar la base de datos
dbConection()

// Declarar las rutas


// Escuchar peticiones