import express from 'express'
const router = express.Router()

import { getTickets, getTicket, insertTicket, deleteTicket, patchTicket } from "../controllers/tickets.controller.js"

router.get("/", getTickets)
router.get("/:id", getTicket)
router.post("/", insertTicket)
router.delete("/:id", deleteTicket)
router.patch("/:id", patchTicket)





export { router }