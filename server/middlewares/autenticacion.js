const jwt = require('jsonwebtoken');

// ===================
// Verificar token
// ===================

let verificaToken = (req, resp, next) => {

    let token = req.get('token'); //Para traer el header token

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return resp.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; //En el token viene el usuario, el decoded es el token decodificado
        next();

    });

};


// ===================
// Verificar AdminRole
// ===================
let verificaAdminRole = (req, resp, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLES') {
        next();
    } else {
        return resp.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

}


module.exports = {
    verificaToken,
    verificaAdminRole
}