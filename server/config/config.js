const { property } = require("underscore");

// ======================
// Puerto
// ======================
process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Vencimiento del token
// ======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================
// SEED del autenticación
// ======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// ======================
// Base de datos
// ======================
let urlDB = process.env.NODE_ENV !== 'dev' ? 'mongodb+srv://pedrocate:Medaigual7@cluster0.0xk61.mongodb.net/cafe?retryWrites=true&w=majority' : 'mongodb://localhost:27017/cafe';
process.env.URLDB = urlDB;

// ======================
// Google client id
// ======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '298011829638-cqb0em1ptlf70oo93dmcpvp643rrj3op.apps.googleusercontent.com';