import express from 'express'
const router = express.Router()

import { getUsers, getUser, disableUser, insertUsers, patchUser } from "../controllers/usuarios.controller.js"


router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", insertUsers)
router.patch("/:id", disableUser)
router.patch("/:id", patchUser)



export { router }