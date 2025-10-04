import express from 'express'
const router = express.Router()

import { getTickets, getTicket, insertTicket, disableTicket, getTicketAcepted, getTicketNotAcepted } from "../controllers/tickets.controller.js"

router.get("/", getTickets)
router.get("/:id", getTicket)
router.get("/aceptedTickets/:id", getTicketAcepted)
router.get("/nonAceptedTickets/:id", getTicketNotAcepted)
router.post("/insertar", insertTicket)
router.patch("/desabilitar", disableTicket)





export { router }