import express from 'express'
const router = express.Router()

import { 
    getAllMessages,
    getMessagesByTicket,
    insertMessage,
    deleteMessage,
    getMessagesByUser
} from "../controllers/mensajes.controller.js"

router.get("/", getAllMessages)
router.get("/byTicket/:ticket_id", getMessagesByTicket)
router.get("/byUser/:user_id", getMessagesByUser)
router.post("/insertar", insertMessage)
router.delete("/eliminar/:id", deleteMessage)

export { router }