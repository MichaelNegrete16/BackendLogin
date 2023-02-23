const {responde} = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    // poner x-token en los header
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'NO hay token en la peticion'
        })
    }

    try {
        const {name,uid} = jwt.verify(token, process.env.SECRET_JWT_SEED)

        req.uid = uid
        req.name = name

    } catch (error) {
        
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })

    }

    next()
}

module.exports = {
    validarJWT
}