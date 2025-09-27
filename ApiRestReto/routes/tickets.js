import express from 'express'
const router = express.Router()

import { getTickets, getTicket, insertTicket, disableTicket, patchTicket } from "../controllers/tickets.controller.js"

router.get("/", getTickets)
router.get("/:id", getTicket)
router.post("/insertar", insertTicket)
router.patch("/desabilitar", disableTicket)
router.patch("/", patchTicket)





export { router }