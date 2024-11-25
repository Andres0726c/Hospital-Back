const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuarios");
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    // console.log(desde);

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    //                               .skip( desde )
    //                               .limit( 5 );

    // const total = await Usuario.countDocuments();

    //Con la desestructuración doy el orden en el que se ejecutaran las promesas 
    const [ usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
                                  .skip( desde )
                                  .limit( 5 ),

        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total
    });

}

const crearUsuarios = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password );
    
        //Guardar usuario
        await usuario.save();

                //Generar JWT
                const token = await generarJWT( usuario.id )
    
        res.json({
            ok: true,
            usuario: usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Error inesperado...revisar logs'
        })
        
    }

}

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

                //Actualizaciones
                const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email ){

            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;


        // const usuarioActilizado = await Usuario.findByIdAndUpdate( uid, campos );
        // Para que Mongoose envié directamente el campo que actualicé, de lo contrario envía primero como estaba antes
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}