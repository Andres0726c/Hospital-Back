/*
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo')

const { validarJWT } = require('../middlewares/validar-JWT');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');


const router = Router();

router.get( '/', getHospitales);

router.post( '/', 
    [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
    ],
    crearHospital);

router.put( '/:id',
    [
    ],
    actualizarHospital);

router.delete( '/:id',
    borrarHospital )

module.exports = router;