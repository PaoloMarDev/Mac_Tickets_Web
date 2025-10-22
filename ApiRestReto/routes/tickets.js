import express from 'express'
const router = express.Router()

import { middleware } from '../middleware/jwt.middleware.js'

import { getTickets, 
         getTicket, 
         insertTicket, 
         disableTicket, 
         getTicketsAcepted, 
         getTicketsNotAcepted, 
         aceptarTicket,
         rechazarTicket,
         asignarCategoria,
         asignarPrioridad,
         asignarEstado,
         getTicketsCerrados
        } from "../controllers/tickets.controller.js"

router.get("/", getTickets)
router.get("/ticketsCerrados", getTicketsCerrados)
router.get("/aceptedTickets/:id", getTicketsAcepted)
router.get("/nonAceptedTickets/:id", getTicketsNotAcepted)
router.get("/:id", getTicket)
router.post("/insertar", insertTicket)
router.patch("/desabilitar", disableTicket)
router.patch("/aceptarTicket", aceptarTicket)
router.patch("/rechazarTicket", rechazarTicket)
router.patch("/asigCategoria", asignarCategoria)
router.patch("/asigPrioridad", asignarPrioridad)
router.patch("/asigEstado", asignarEstado)





export { router }