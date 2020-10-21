// ======================
// Puerto
// ======================
process.env.PORT = process.env.PORT || 3000;


// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ======================
// Base de datos
// ======================
let urlDB = process.env.NODE_ENV !== 'dev' ? 'mongodb+srv://pedrocate:Medaigual7@cluster0.0xk61.mongodb.net/cafe?retryWrites=true&w=majority' : 'mongodb://localhost:27017/cafe';

process.env.URLDB = urlDB;