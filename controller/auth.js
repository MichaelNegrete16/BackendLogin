const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')


const crearUsuario = async(req,res = response) => {

    const {email,password} = req.body
    try {
        
        let usuario = await Usuario.findOne({email})
        // Validar si el correo ya existe
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese correo'
            })
        }

        usuario = new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password,salt)

        await usuario.save()

        // TODO: Generar JWT

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se presento un error, hable con el admin'
        })
    }

}

module.exports = {
    crearUsuario
}