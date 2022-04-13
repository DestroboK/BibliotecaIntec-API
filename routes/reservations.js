const { Router } = require("express");
const { crearReserv, getReserv, getAllReserv, eliminarReserv, actualizarReserv } = require("../controllers/reservation");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post('/new', validarCampos,crearReserv);
router.get('/all',validarCampos, getAllReserv);
router.get('/solo',validarCampos, getReserv);
router.post('/delete',validarCampos, eliminarReserv);
router.post('/update',validarCampos, actualizarReserv);

module.exports = router;