const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Simulación de base de datos en memoria (ideal para despliegue rápido en Vercel)
let plataformas = [
    { id: 1, nombre: 'Netflix' },
    { id: 2, nombre: 'HBO Max' }
];

let series = [
    { id: 1, nombre: 'Breaking Bad', plataformaId: 1 },
    { id: 2, nombre: 'Chernobyl', plataformaId: 2 }
];

let valoraciones = [
    { id: 1, plataformaId: 2, serieId: 2, puntaje: 10, observacion: 'Obra maestra absoluta.' }
];

// Ruta Principal (Muestra los listados y formularios de los CRUDs)
app.get('/', (req, res) => {
    res.render('index', { plataformas, series, valoraciones });
});

// --- CRUD PLATAFORMAS ---
app.post('/plataformas/crear', (req, res) => {
    const { nombre } = req.body;
    const nuevoId = plataformas.length > 0 ? plataformas[plataformas.length - 1].id + 1 : 1;
    plataformas.push({ id: nuevoId, nombre });
    res.redirect('/');
});

app.post('/plataformas/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    plataformas = plataformas.filter(p => p.id !== id);
    res.redirect('/');
});

// --- CRUD SERIES ---
app.post('/series/crear', (req, res) => {
    const { nombre, plataformaId } = req.body;
    const nuevoId = series.length > 0 ? series[series.length - 1].id + 1 : 1;
    series.push({ id: nuevoId, nombre, plataformaId: parseInt(plataformaId) });
    res.redirect('/');
});

app.post('/series/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    series = series.filter(s => s.id !== id);
    res.redirect('/');
});

// --- CRUD VALORACIONES ---
app.post('/valoraciones/crear', (req, res) => {
    const { plataformaId, serieId, puntaje, observacion } = req.body;
    const nuevoId = valoraciones.length > 0 ? valoraciones[valoraciones.length - 1].id + 1 : 1;
    valoraciones.push({
        id: nuevoId,
        plataformaId: parseInt(plataformaId),
        serieId: parseInt(serieId),
        puntaje: parseInt(puntaje),
        observacion
    });
    res.redirect('/');
});

app.post('/valoraciones/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    valoraciones = valoraciones.filter(v => v.id !== id);
    res.redirect('/');
});

// Puerto local para desarrollo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;