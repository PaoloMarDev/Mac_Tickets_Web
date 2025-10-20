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

router.get("/", middleware, getTickets)
router.get("/ticketsCerrados", middleware, getTicketsCerrados)
router.get("/aceptedTickets/:id", middleware, getTicketsAcepted)
router.get("/nonAceptedTickets/:id", middleware, getTicketsNotAcepted)
router.get("/:id", middleware, getTicket)
router.post("/insertar", middleware, insertTicket)
router.patch("/desabilitar", middleware, disableTicket)
router.patch("/aceptarTicket", middleware, aceptarTicket)
router.patch("/rechazarTicket", middleware, rechazarTicket)
router.patch("/asigCategoria", middleware, asignarCategoria)
router.patch("/asigPrioridad", middleware, asignarPrioridad)
router.patch("/asigEstado", middleware, asignarEstado)





export { router }