const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {
       

        const payload = {
            uid
            //Pueden ir mas campos, depende de mis necesidades ej: nombre, email, role, etc
        };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {

            if (err){
                console.log(err);
                reject( 'No se pued generar el JWT' )
            } else {
                resolve( token );
            }
            
        });

    });

}



module.exports = {
    generarJWT
}