require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); //paquete que viene con node

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// configuración global de rutas
app.use(require('./routes/index'));

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public'))); //para armar bien el path


mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');

    });

/*
let resp = mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
*/

app.listen(process.env.PORT, () => {
    console.log('Esuchando puerto: ', process.env.PORT);
})