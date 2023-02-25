// Creacion de las rutas de usuario

const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {crearUsuario,loginUsuario, revalidarToken,getEventos} = require('../controller/auth')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

// Obtener Eventos
router.get('/',getEventos)

router.post(
    '/new',
    [
        // Middleware
        check('name','El Nombre es obligatorio').not().isEmpty(),
        check('departament','El Departamento es obligatorio').not().isEmpty(),
        check('email','El Correo es obligatorio').isEmail(),
        check('password','La contraseña debe tener mas de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario )

router.post(
    '/',
    [
        // Middleware
        check('email','El Correo no es valido o no esta registrado').isEmail(),
        check('password','La contraseña es incorrecta').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario
)


//TODO: router.get('/renew', validarJWT, revalidarToken)
router.get('/renew', validarJWT ,revalidarToken)

module.exports = router