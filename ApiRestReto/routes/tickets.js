import express from 'express'
const router = express.Router()

import { getTickets, getTicket, insertTicket, disableTicket } from "../controllers/tickets.controller.js"

router.get("/", getTickets)
router.get("/:id", getTicket)
router.post("/insertar", insertTicket)
router.patch("/desabilitar", disableTicket)





export { router }