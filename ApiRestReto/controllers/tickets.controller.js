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

// Metodo desactivar un ticket
const disableTicket = async (req, res) => {
    try{
        const id = req.body.id
        if(!id){
            return res.status(400).json({error : "Falta el id"})
        }

        await pool.query("UPDATE tickets SET is_active = FALSE WHERE id = ?", [id]); 
        
        res.status(201).json({
            exito: "Se logró la actualización de desabilitar ticket"
        })

    } catch(error){
        console.error('Error al desactivar ticket', error)
        res.status(500).json({ error: 'Error al desactivar el ticket'});
    }
}

// Metodo para crear usuario
const insertTicket = async (req, res) => {
    try{
        const {title, description, category, priority, status, created_by, assigned_to} = req.body;
        if(!title || !description || !category || !priority || !status || !created_by || !assigned_to){
            return res.status(400).json(
                { error: "Faltan campos obligatorios, campos: title, description, category, priority, status, created_by, assigned_to"});
        }

        const [result] = await pool.query("INSERT INTO `tickets` (`title`, `description`, `category`, `priority`, `status`, `created_by`, `assigned_to`) VALUES (?,?,?,?,?,?,?)", 
            [title, description, category, priority, status, created_by, assigned_to]);
        
        res.status(201).json({
            exito: "Se logró agregar al nuevo ticket"
        });

    } catch(error){
        console.error('Error al añadir ticket', error)
        res.status(500).json({ error: 'Error al añadir el ticket'});
    }
}


export { getTicket, getTickets, disableTicket, insertTicket}