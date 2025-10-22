import { pool } from "../helpers/mysql-config.js";

// Obtener todas las notificaciones
const getNotifications = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones de la aplicación' });
    }
};

// Obtener notificaciones por usuario
const getNotificationsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
            [id]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener notificaciones por usuario:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones del usuario' });
    }
};

// Marcar notificación como leída (no se si se usará pero supongo que si xD)
const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Falta el id de la notificación" });
        }

        await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ?', [id]);

        res.status(200).json({ exito: "Notificación marcada como leída" });
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
        res.status(500).json({ error: 'Error al marcar la notificación como leída' });
    }
};

// Eliminar una notificación (igual, no se si se usará pero supongo que si XD)
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Falta el id de la notificación" });
        }

        await pool.query('DELETE FROM notifications WHERE id = ?', [id]);

        res.status(200).json({ exito: "Notificación eliminada correctamente" });
    } catch (error) {
        console.error('Error al eliminar notificación:', error);
        res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
};

export {
    getNotifications,
    getNotificationsByUser,
    markNotificationAsRead,
    deleteNotification
};


