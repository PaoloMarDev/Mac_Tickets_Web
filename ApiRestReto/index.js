import express from "express";
import cors from 'cors'
import multer from "multer";
import dotenv from 'dotenv'
dotenv.config()


import {router as usuarios} from './routes/usuarios.js'
import {router as tickets} from './routes/tickets.js'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Rutas
app.use('/usuarios', usuarios)
app.use('/tickets', tickets)

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

