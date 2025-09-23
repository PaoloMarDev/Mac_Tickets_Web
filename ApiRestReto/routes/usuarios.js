import express from 'express'
const router = express.Router()

import { getUsers, getUser, deleteUser, insertUsers, patchUser } from "../controllers/usuarios.controller.js"


router.get("/", getUsers)
router.get("/:id", getUser)
router.delete("/:id", deleteUser)
router.post("/", insertUsers)
router.patch("/:id", patchUser)



export { router }