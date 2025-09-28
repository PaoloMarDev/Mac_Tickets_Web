import jwt from 'jsonwebtoken'
import express from 'express'

const middleware = express.Router()

const verifyJWT = (req, res, next) => {
    let token = req.headers['authorization']


    if(token){
        token = token.split(' ')[1]
        //Verificar el token
        jwt.verify(token, process.env.KEYPHRASE,(err, decoded) => {
            if(err){
                // No es correcto, res.json(error)
                return res.status(403).json({mensaje: 'Token inválido'})
            }
            else{
                //Si es correcto, next()
                next()
            }
        })
    }
    else{
        return res.status(401).send({mensaje: 'Token no proporcionado'})
    }
}


middleware.use(verifyJWT)

export { middleware }