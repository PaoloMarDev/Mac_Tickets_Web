import { pool } from '../helpers/mysql-config.js' 
import jwt from 'jsonwebtoken'

const doLogin = async (req, res) => {
    try{

        let token = ''
        let result = ''
        const email = req.body.email
        const password = req.body.password

        if(!email || !password){
            return res.status(400).json({error : "Falta el email o el password"})
        }


        const sql = "SELECT email, role, is_active FROM users WHERE email = ? AND password = SHA2(?, 224)";
        const [rows] = await pool.query(sql, [email, password])
        
        if(rows.length === 1){
            token = jwt.sign({email: email}, process.env.KEYPHRASE, {expiresIn: 7200})
            result = { token: token, message: 'Usuario autenticado correctamente', role : rows[0].role, is_active : rows[0].is_active}
        }
        else{
            result = { token: null, message: 'El nombre de usuario o contraseña son incorrectos' }
        }
        res.json(result)
    } catch(error){
        console.log(error)
        res.status(500).json({error: 'Hubo un error en el inicio de sesión'})
    }
}

export { doLogin }