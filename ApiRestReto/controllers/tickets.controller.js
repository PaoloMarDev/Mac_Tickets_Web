import { pool } from "../helpers/mysql-config.js";

// Metodo para conseguir a todos los tickets
const getTickets = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM tickets');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        res.status(500).json({ error: 'Error al obtener los tickets de la aplicación'});}
}

// Metodo para conseguir un ticket
const getTicket = async (req, res) => {
    try{
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM tickets WHERE id = ?', [id]);
        if (rows.length === 0){
            return res.status(404).json({ error: 'tickets no encontrado'});      
        }

        const user = rows[0];
        res.json(user);
    } catch(error) {
        console.log('Error al obtener tickets por ID', error);
        res.status(500).json({error: 'Error al obtener el tickets' });
    }
}

// Metodo eliminar ticket
const deleteTicket = async (req, res) => {
    
}

// Metodo para crear usuario
const insertTicket = async (req, res) => {
    
}

// Metodo para modificar usuario
const patchTicket = async (req, res) => {
    
}

export { getTicket, getTickets, deleteTicket, insertTicket, patchTicket}