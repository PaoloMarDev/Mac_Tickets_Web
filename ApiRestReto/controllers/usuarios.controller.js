import { pool } from "../helpers/mysql-config.js";

// Metodo para conseguir a todos los usuarios
const getUsers = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios de la aplicación'});}
}

// Metodo para conseguir a 1 usuario
const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0){
            return res.status(404).json({ error: 'usuario no encontrado'});      
        }

        const user = rows[0];
        res.json(user);
    } catch(error) {
        console.log('Error al obtener usuario por ID', error);
        res.status(500).json({error: 'Error al obtener el usuario' });
    }
}


// Metodo eliminar usuario
const disableUser = async (req, res) => {
    
}
  

// Metodo para crear usuario
const insertUsers = async (req, res) => {
    try{
        const {email, password, role } = req.body;
        if(!email || !password || !role){
            return res.status(400).json({ error: "Faltan campos obligatorios"});
        }

        const [result] = await pool.query("INSERT INTO users (email, password, role) VALUES (?, SHA2(?, 224), ?)",
            [email, password, role]
        );
        
        res.status(201).json({
            email,
            password,
            role
        });

    } catch(error){
        console.error('Error al añadir usuario', error)
        res.status(500).json({ error: 'Error al añadir el usuario'});
    }
};

// Metodo para modificar usuario
const patchUser = async (req, res) => {
    
}

export { getUser, getUsers, disableUser, insertUsers, patchUser}