import express from "express";
import { paginaContacto, paginaDetallesViajes, paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes } from "../controllers/paginaController.js";
import { guardarTestimonio } from "../controllers/testimoniosController.js";
const router = express.Router();

// Rutas
// Pagina Inicio
router.get('/', paginaInicio);

// Pagina Nosotros
router.get('/nosotros', paginaNosotros);

// Pagina Testimonios
router.get('/testimonios', paginaTestimonios);
router.post('/testimonios', guardarTestimonio);


// Pagina Viajes
router.get('/viajes', paginaViajes)

// Pagina Detalles del viaje
router.get('/viajes/:slug', paginaDetallesViajes);

// Pagina Contacto
router.get('/contacto', paginaContacto)

export default router;