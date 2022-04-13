const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/' ,[
    check('email','El email es obligatorio').isEmail(), 
    check('password','Se requiere la clave').isLength({min: 8, max: 20}),
    validarCampos
], loginUsuario)
//Creando un nuevo usuario
router.post('/new',[
    check('name','El nombre es necesario').isString().isLength({min: 8, max: 60}).notEmpty(), 
    check('email','El email es obligatorio').isEmail().notEmpty(), 
    check('password','Se requiere la clave').isLength({min: 8, max: 20}).notEmpty(),
    validarCampos
],crearUsuario)
// Validar token
router.get('/renew' ,validarJWT, validarToken)

module.exports = router;