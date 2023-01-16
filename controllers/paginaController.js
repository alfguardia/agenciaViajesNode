// Importar el modelo de la base de datos
import { Viaje } from "../models/Viaje.js";
import { Testimonios } from "../models/Testimonios.js";


const paginaInicio = async (request, response) => { // Request: lo que enviamos / Response: lo que nos responde express

    const resultadosDB = [];

    resultadosDB.push(Viaje.findAll({ limit: 3 }));
    resultadosDB.push(Testimonios.findAll({ limit: 3 }));

    try {
        const resultados = await Promise.all(resultadosDB);
        response.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultados[0],
            testimonios: resultados[1]
        }); // "send" envia un texto plano desde express    
    } catch (error) {
        console.log(error);
    }


}

const paginaNosotros = (request, response) => {
    response.render('nosotros', {
        pagina: 'Nosotros'
    }); // "render" se usa para enviar una vista (MVC Model)
}

const paginaTestimonios = async (request, response) => {

    try {
        const testimonios = await Testimonios.findAll();

        response.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        }); // "render" se usa para enviar una vista (MVC Model)
    } catch (error) {
        console.log(error);
    }
}

const paginaViajes = async (request, response) => {
    // Consultar a la DB
    const viajes = await Viaje.findAll();
    response.render('viajes', {
        pagina: 'Viajes',
        viajes
    }); // "render" se usa para enviar una vista (MVC Model)
}

const paginaDetallesViajes = async (request, response) => {
    const slug = request.params.slug;

    try {
        const resultado = await Viaje.findOne({ where: { slug } });
        response.render('viaje', {
            pagina: 'Detalles del Viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }

}

const paginaContacto = (request, response) => {
    response.send('contacto');
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    paginaViajes,
    paginaContacto,
    paginaDetallesViajes
} 