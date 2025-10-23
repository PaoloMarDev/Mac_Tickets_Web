import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile, downloadFile } from "../controllers/archivos.controller.js";


const router = express.Router();



//  Subir archivo
router.post("/upload", uploadFile);

//  Descargar archivo
router.get("/download/:id", downloadFile);

export { router }; 

