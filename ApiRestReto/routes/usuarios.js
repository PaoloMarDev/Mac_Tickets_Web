import express from 'express'
const router = express.Router()

import { middleware } from '../middleware/jwt.middleware.js'

import { getUsers, getUser, disableUser, insertUsers, recoverUser, getTecnicos, asignarTicket} from "../controllers/usuarios.controller.js"


router.get("/", getUsers)
router.get("/usuario", getUser)
router.get("/tecnicos", getTecnicos)
router.post("/insertar", insertUsers)
router.patch("/desabilitar", disableUser)
router.patch("/recuperar", recoverUser)
router.patch("/asignar", asignarTicket)



export { router }