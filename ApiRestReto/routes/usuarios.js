import express from 'express'
const router = express.Router()

import { getUsers, getUser, disableUser, insertUsers, recoverUser } from "../controllers/usuarios.controller.js"


router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/insertar", insertUsers)
router.patch("/desabilitar", disableUser)
router.patch("/recuperar", recoverUser)



export { router }