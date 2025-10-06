import express from 'express'
const router = express.Router()

import { getTickets, getTicket, insertTicket, disableTicket, getTicketsAcepted, getTicketsNotAcepted, aceptarTicket, rechazarTicket } from "../controllers/tickets.controller.js"

router.get("/", getTickets)
router.get("/:id", getTicket)
router.get("/aceptedTickets/:id", getTicketsAcepted)
router.get("/nonAceptedTickets/:id", getTicketsNotAcepted)
router.post("/insertar", insertTicket)
router.patch("/desabilitar", disableTicket)
router.patch("/aceptarTicket", aceptarTicket)
router.patch("/rechazarTicket", rechazarTicket)





export { router }