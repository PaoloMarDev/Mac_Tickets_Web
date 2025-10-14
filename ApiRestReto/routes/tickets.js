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
         asignarPrioridad
        } from "../controllers/tickets.controller.js"

router.get("/", middleware, getTickets)
router.get("/:id", middleware, getTicket)
router.get("/aceptedTickets/:id", middleware, getTicketsAcepted)
router.get("/nonAceptedTickets/:id", middleware, getTicketsNotAcepted)
router.post("/insertar", middleware, insertTicket)
router.patch("/desabilitar", middleware, disableTicket)
router.patch("/aceptarTicket", middleware, aceptarTicket)
router.patch("/rechazarTicket", middleware, rechazarTicket)
router.patch("/asigCategoria", middleware, asignarCategoria)
router.patch("/asigPrioridad", middleware, asignarPrioridad)





export { router }