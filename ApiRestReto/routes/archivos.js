import express from 'express'
const router = express.Router()

import { uploadFiles } from "../controllers/archivos.controller.js"

router.get("/upload", uploadFiles)





export { router }