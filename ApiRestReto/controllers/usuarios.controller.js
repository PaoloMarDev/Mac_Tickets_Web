import { pool } from "../helpers/mysql-config.js";

// Metodo para conseguir a todos los usuarios
const getUsers = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT id, username, email, role, is_active, created_at FROM users WHERE is_active = 1');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios de la aplicación'});}
}

// Metodo para conseguir a 1 usuario
const getUser = async (req, res) => {
    try{
        const { id } = req.body;
        const [rows] = await pool.query('SELECT id, username, email, role, is_active, created_at FROM users WHERE id = ?', [id]);
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


// Metodo desactivar usuario
const disableUser = async (req, res) => {
    try{
        const email = req.body.email
        if(!email){
            return res.status(400).json({error : "Falta el email"})
        }

        await pool.query("UPDATE users SET is_active = FALSE WHERE email = ?", [email]); 
        
        res.status(201).json({
            exito: "Se logró la actualización de desabilitar cuenta"
        })

    } catch(error){
        console.error('Error al desactivar usuario', error)
        res.status(500).json({ error: 'Error al desactivar al usuario'});
    }
}
  

// Metodo para crear usuario
const insertUsers = async (req, res) => {
    try{
        const {username, email, password, role } = req.body;
        if(!username || !email || !password || !role){
            return res.status(400).json({ error: "Faltan campos obligatorios, campos: username, email, password, role"});
        }

        const [result] = await pool.query("INSERT INTO users (email, password, role) VALUES (?, SHA2(?, 224), ?)",
            [email, password, role]
        );
        
        res.status(201).json({
            exito: "Se logró agregar al nuevo usuario"
        });

    } catch(error){
        console.error('Error al añadir usuario', error)
        res.status(500).json({ error: 'Error al añadir el usuario'});
    }
};

// Metodo para modificar usuario
const recoverUser = async (req, res) => {
    try{
        const {email, password} = req.body
        
        if(!email || !password){
            return res.status(400).json({error : "Falta el email o el password nuevo"})
        }

        await pool.query("UPDATE users SET password = SHA2(?, 224) WHERE email = ?", [password, email]); 
        
        res.status(201).json({
            exito: "Se logró la actualización de contrasena"
        })

    } catch(error){
        console.error('Error al recuperar la contrasena usuario', error)
        res.status(500).json({ error: 'Error al recuperar la contrasena'});
    }
}

const getTecnicos = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT id, username, email, role, is_active, created_at FROM users WHERE is_active = 1 AND role = "TECNICO"');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios de la aplicación'});}
}

const asignarTicket = async (req, res) => {
    try{
        const {ticket_id, user_id} = req.body
        
        if(!ticket_id || !user_id){
            return res.status(400).json({error : "Falta algún id"})
        }

        await pool.query("UPDATE tickets SET assigned_to = ? WHERE id = ?", [user_id, ticket_id]); 
        
        res.status(201).json({
            exito: "Se logró la actualización de asignación de ticket"
        })

    } catch(error){
        console.error('Error al asignar el usuario', error)
        res.status(500).json({ error: 'Error al asignar el usuario'});
    }
}



export { getUser, 
         getUsers, 
         disableUser, 
         insertUsers, 
         recoverUser, 
         getTecnicos, 
         asignarTicket}