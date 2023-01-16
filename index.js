// Para crear el servidor
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Conectar la Base de Datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Definir puerto del servidor
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
// request => lo que se solicita al servidor
// response => la respuesta del servidor
// next => para vanzar al proximo middleware
app.use((request, response, next) => {
    const year = new Date();

    response.locals.actualYear = year.getFullYear();
    response.locals.nombreSitio = 'Agencia de Viajes';

    return next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));


// Agregar la carpeta public para usar Hoja de estilos e imagenes
app.use(express.static('public'));

//Agregar routing
// "use" soporta las peticiones GET,POST,PATCH,PUT,DELETE
app.use('/', router);





app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port} - http://localhost:${port}`);
})

