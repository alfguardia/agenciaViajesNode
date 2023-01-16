import { Testimonios } from "../models/Testimonios.js";

const guardarTestimonio = async (request, response) => {

    // Consultar los testimonios existentes
    const testimonios = await Testimonios.findAll();

    // Crear la validación del formulario
    const { nombre, correo, mensaje } = request.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacio' });
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo esta vacio' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje esta vacio' });
    }

    if (errores.length > 0) {
        response.render('testimonios', {
            testimonios,
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje
        })
    } else {
        // Enviar a la base de datos
        try {
            await Testimonios.create({
                nombre,
                correo,
                mensaje
            })

            response.redirect('/testimonios');

        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonio
}