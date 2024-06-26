/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo')

const { validarJWT } = require('../middlewares/validar-JWT');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');


const router = Router();

router.get( '/', getMedicos);

router.post( '/', 
    [
        validarJWT,
        check('nombre','El nombre de médico es obligatorio').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put( '/:id',
    [
    ],
    actualizarMedico);

router.delete( '/:id',
    borrarMedico )

module.exports = router;