const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')


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
        const datoEncriptado = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password,datoEncriptado)

        await usuario.save()

        // TODO: Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se presento un error, hable con el admin'
        })
    }

}

const loginUsuario  = async(req,res = response) => {

    const {email,password} = req.body

    
    try {
        // Validar que el usuario exista
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El Usuario no existe con este correo'
            })
        }

        // Validar la contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password)
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Constraseña Incorrecta'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se presento un erro, hable con el administrador'
        })
    }

}

const revalidarToken = async(req,res = response) => {

    const {uid,name} = req

    // Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name)

    res.json({
        ok:true,
        uid,name,
        token
    })
}

const getEventos = async (req,res = response) => {
    const evento = await Usuario.find()

    res.json({
        ok:true,
        msg:evento
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getEventos
}