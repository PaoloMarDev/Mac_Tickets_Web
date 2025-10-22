import express from 'express';
const router = express.Router();

import { middleware } from '../middleware/jwt.middleware.js';
import {
    getNotifications,
    getNotificationsByUser,
    markNotificationAsRead,
    deleteNotification
} from '../controllers/notificaciones.controller.js';

// Obtener todas las notificaciones
router.get('/', middleware, getNotifications);
// Obtener notificaciones de un usuario específico
router.get('/:id', middleware, getNotificationsByUser);
// Marcar notificación como leída
router.patch('/markAsRead', middleware, markNotificationAsRead);
// Eliminar una notificación
router.delete('/delete', middleware, deleteNotification);

export { router };
