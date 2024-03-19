const { response } = require('express')
const bcryptjs = require('bcryptjs');
const  Usuario  = require('../models/usuarios')

const login = async ( req, res= response ) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no válido'
            });
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }


        res.json({
            ok: true,
            msg: 'Hola mundo'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el daministrador'
        })
    }

}


module.exports = {
    login
}