import express from 'express'
const router = express.Router()

import { getNotifications  } from "../controllers/notificaciones.controller.js"

router.get("/", getNotifications)





export { router }