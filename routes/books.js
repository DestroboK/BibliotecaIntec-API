const { Router } = require("express");
const { crearLibro, getLibros, getLibro, eliminarLibro, actualizarLibro } = require("../controllers/book");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post('/new', validarCampos,crearLibro);
router.get('/all',validarCampos, getLibros);
router.get('/solo',validarCampos, getLibro);
router.post('/delete',validarCampos, eliminarLibro);
router.post('/update',validarCampos, actualizarLibro);

module.exports = router;
