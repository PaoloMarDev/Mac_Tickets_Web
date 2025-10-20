import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import fileUpload from "express-fileupload";
dotenv.config()


import {router as usuarios} from './routes/usuarios.js'
import {router as tickets} from './routes/tickets.js'
import {router as login} from './routes/login.js'
import {router as archivos} from './routes/archivos.js'
import {router as mensajes} from './routes/mensajes.js'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true
}));


// Rutas
app.use('/usuarios', usuarios)
app.use('/tickets', tickets)
app.use('/login', login);
app.use('/archivos', archivos);
app.use('/mensajes', mensajes);


// Ruta de prueba

app.get('/', (req, res) => {
    res.json({ message: 'API de Lugares Turísticos funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`)
});

