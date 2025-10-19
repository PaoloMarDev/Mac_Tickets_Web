import { pool } from "../helpers/mysql-config.js";

const uploadFiles = (req, res) => {
let sampleFile = '';
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }

    sampleFile = req.files.file;

    //name, data, size, mimetype
    let sql = `INSERT INTO file(name, data, size, mimetype) VALUES(?, ?, ?, ?)`;
      conexion.query(sql, [sampleFile.name, sampleFile.data, sampleFile.size, sampleFile.mimetype], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      res.json(results);
    });
}

export { uploadFiles }
