import express from 'express'
const router = express.Router()

import { middleware } from '../middleware/jwt.middleware.js'

import { getUsers, getUser, disableUser, insertUsers, recoverUser, getTecnicos } from "../controllers/usuarios.controller.js"


router.get("/", middleware, getUsers)
router.get("/usuario", middleware, getUser)
router.get("/tecnicos", middleware, getTecnicos)
router.post("/insertar", middleware, insertUsers)
router.patch("/desabilitar", middleware, disableUser)
router.patch("/recuperar", middleware, recoverUser)



export { router }