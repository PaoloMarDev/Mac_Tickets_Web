import express from 'express'
const router = express.Router()

import { middleware } from '../middleware/jwt.middleware.js'

import { getUsers, getUser, disableUser, insertUsers, recoverUser, getTecnicos, asignarTicket} from "../controllers/usuarios.controller.js"


router.get("/", middleware, getUsers)
router.get("/usuario", middleware, getUser)
router.get("/tecnicos", middleware, getTecnicos)
router.post("/insertar", middleware, insertUsers)
router.patch("/desabilitar", middleware, disableUser)
router.patch("/recuperar", middleware, recoverUser)
router.patch("/asignar", middleware, asignarTicket)



export { router }