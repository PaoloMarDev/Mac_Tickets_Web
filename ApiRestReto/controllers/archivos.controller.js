import { pool } from "../helpers/mysql-config.js";

// SUBIR ARCHIVO
const uploadFile = async (req, res) => {
  try {
    // Validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No se enviaron archivos" });
    }

    const file = req.files.file;
    const { ticket_id, sender_user_id } = req.body;

    if (!ticket_id || !sender_user_id) {
      return res
        .status(400)
        .json({ message: "Faltan datos: ticket_id o sender_user_id" });
    }

    // Insertar en la tabla file
    const [result] = await pool.query(
      `INSERT INTO file (name, data, size, mimetype, ticket_id, sender_user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [file.name, file.data, file.size, file.mimetype, ticket_id, sender_user_id]
    );

    
    res.json({
      message: "Archivo subido correctamente",
      file_id: result.insertId,
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ message: "Error al subir archivo", error });
  }
};

//  DESCARGAR ARCHIVO
const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`SELECT * FROM file WHERE id = ?`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }

    const file = rows[0];

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.name}"`
    );
    res.setHeader("Content-Type", file.mimetype);
    res.send(file.data);
  } catch (error) {
    console.error("Error al descargar archivo:", error);
    res.status(500).json({ message: "Error al descargar archivo", error });
  }
};

export { uploadFile, downloadFile };

