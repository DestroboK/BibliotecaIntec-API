const { Router } = require("express");
const { crearSanc, getSanc, getAllSancs, eliminarSanc, actualizarSanc } = require("../controllers/sanctions");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post('/new', validarCampos,crearSanc);
router.get('/all',validarCampos, getAllSancs);
router.get('/solo',validarCampos, getSanc);
router.post('/delete',validarCampos, eliminarSanc);
router.post('/update',validarCampos, actualizarSanc);

module.exports = router;