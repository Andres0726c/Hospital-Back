const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = (req, res = response) => {
    
    res.json({
        ok:true,
        msg: 'getHospitales'
    })

}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body });
    // console.log(uid);

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    

}

const actualizarHospital = (req, res = response) => {
    
    res.json({
        ok:true,
        msg: 'actualizarHospitales'
    })

}

const borrarHospital = (req, res = response) => {
    
    res.json({
        ok:true,
        msg: 'borrarHospitales'
    })

}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}