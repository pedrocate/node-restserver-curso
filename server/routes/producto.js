const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion');
const producto = require('../models/producto');

let app = express();

let Producto = require('../models/producto');


//Obtener todos los productos
app.get('/productos', verificaToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;

    Producto.find({ disponible: true })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(5)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            Producto.count({ disponible: true }, (err, conteo) => {
                return res.json({
                    ok: true,
                    productos,
                    conteo
                })
            })
        })
});


//Obtener un producto por ID
app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'ID no existe'
                        }
                    });
                }
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
});

//Buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i'); //Insensible a mayúsculas y minúsculas

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (productos.length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No existe ese termino'
                    }
                });
            }

            res.json({
                ok: true,
                productos
            })

        })

});

//Crear un nuevo producto
app.post('/productos', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoría del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});


//Actualizar un producto
app.put('/productos/:id', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoría del listado
    let id = req.params.id;
    let body = req.body;


    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })
        });

    })
});


//Borrar un producto
app.delete('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let cambiaDisponibilidad = {
        disponible: false
    }

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Producto.findByIdAndUpdate(id, cambiaDisponibilidad, { new: true }, (err, productoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            producto: productoBorrado
        })

    });
});



module.exports = app;