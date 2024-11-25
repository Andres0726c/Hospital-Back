
const Usuario = require('../models/usuarios');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');
const hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
    
    if ( fs.existsSync( path ) ){
        //Borrar imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async(tipo, id, path, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
            {
                const medico = await Medico.findById(id);
                if ( !medico ) {
                    console.log('No es un medico por id');
                    
                    return false;
                }

                const pathViejo = `./uploads/medicos/${ medico.img }`;
                borrarImagen( pathViejo );

                medico.img = nombreArchivo;
                await medico.save();
                return true;
            }
            break;

        case 'hospitales':
            {
                const hospital = await Hospital.findById(id);
                if ( !hospital ) {
                    console.log('No es un hospital por id');
                    
                    return false;
                }

                const pathViejo = `./uploads/hospitales/${ hospital.img }`;
                borrarImagen( pathViejo );

                hospital.img = nombreArchivo;
                await hospital.save();
                return true;
            }
            break;

        case 'usuarios':
            {
                const usuario = await Usuario.findById(id);
                if ( !usuario ) {
                    console.log('No es un usuario por id');
                    
                    return false;
                }

                const pathViejo = `./uploads/usuarios/${ usuario.img }`;
                borrarImagen( pathViejo );

                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            }
        break;
    
        default:
            break;
    }


}

module.exports = {
    actualizarImagen
}