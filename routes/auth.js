// Creacion de las rutas de usuario

const {Router} = require('express')
const {check} = require('express-validator')

const router = Router()

router.post(
    '/new',
    [
        // Middleware
        check('name','El Nombre es obligatorio').not().isEmpty(),
        check('email','El Correo es obligatorio').isEmail(),
        check('password','La contraseña debe tener mas de 6 caracteres').isLength({min: 6}),
    //TODO:    validarCampos
    ],
    //TODO: crearUsuario 
)

router.post(
    '/',
    [
        // Middleware
        check('email','El Correo no es valido o no esta registrado').isEmail(),
        check('password','La contraseña es incorrecta').isLength({min: 6}),
    //TODO:    validarCampos
    ],
    //TODO: crearUsuario 
)

//TODO: router.get('/renew', validarJWT, revalidarToken)

module.exports = router