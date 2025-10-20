import { pool } from "../helpers/mysql-config.js";

//  Obtener todos los mensajes
const getAllMessages = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ticket_messages');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ error: 'Error al obtener los mensajes de los tickets' });
    }
};

//  Obtener los mensajes de un ticket específico
const getMessagesByTicket = async (req, res) => {
    try {
        const { ticket_id } = req.params;
        const [rows] = await pool.query(
        `SELECT tm.*, u.username AS sender_name 
        FROM ticket_messages tm 
        JOIN users u ON tm.sender_user_id = u.id 
        WHERE tm.ticket_id = ? 
        ORDER BY tm.created_at ASC`,
        [ticket_id]
        );


        if (rows.length === 0) {
            return res.status(404).json({ error: 'No se encontraron mensajes para este ticket' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener mensajes del ticket:', error);
        res.status(500).json({ error: 'Error al obtener mensajes del ticket' });
    }
};

//  Insertar un nuevo mensaje
const insertMessage = async (req, res) => {
    try {
        const { ticket_id, sender_user_id, body } = req.body;

        if (!ticket_id || !sender_user_id || !body) {
            return res.status(400).json({
                error: "Faltan campos obligatorios: ticket_id, sender_user_id, body"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO ticket_messages (ticket_id, sender_user_id, body) VALUES (?, ?, ?)`,
            [ticket_id, sender_user_id, body]
        );

        res.status(201).json({
            exito: "Se agregó correctamente el mensaje al ticket",
            message_id: result.insertId
        });
    } catch (error) {
        console.error('Error al insertar mensaje:', error);
        res.status(500).json({ error: 'Error al añadir el mensaje' });
    }
};

// Eliminar un mensaje específico
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Falta el id del mensaje" });
        }

        const [result] = await pool.query('DELETE FROM ticket_messages WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mensaje no encontrado' });
        }

        res.status(200).json({ exito: 'Mensaje eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar mensaje:', error);
        res.status(500).json({ error: 'Error al eliminar el mensaje' });
    }
};

// Obtener los mensajes enviados por un usuario
const getMessagesByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const [rows] = await pool.query(
            `SELECT tm.*, t.title AS ticket_title 
             FROM ticket_messages tm 
             JOIN tickets t ON tm.ticket_id = t.id 
             WHERE tm.sender_user_id = ?
             ORDER BY tm.created_at DESC`,
             [user_id]
        );

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener mensajes del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los mensajes del usuario' });
    }
};

export { 
    getAllMessages,
    getMessagesByTicket,
    insertMessage,
    deleteMessage,
    getMessagesByUser
};