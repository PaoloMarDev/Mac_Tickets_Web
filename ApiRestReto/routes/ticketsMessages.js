import express from 'express'
const router = express.Router()

import { 
    getAllMessages,
    getMessagesByTicket,
    insertMessage,
    deleteMessage,
    getMessagesByUser
} from "../controllers/ticketsMessages.controller.js"

router.get("/", getAllMessages)
router.get("/byTicket/:ticket_id", getMessagesByTicket);
router.post("/insertar", insertMessage)
router.get("/byUser/:user_id", getMessagesByUser)
router.delete("/eliminar/:id", deleteMessage)

export { router }
