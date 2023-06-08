const express = require('express');
const { create } = require('express-handlebars');
const {
	leerAnime,
	buscarPorNombre,
	agregarAnime,
	actualizarAnime,
	borrarAnime,
} = require('./utils/operaciones.js');

const app = express();
const hbs = create({
	partialsDir: ['views/partials/'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());

app.use(express.static('public'));
app.use(
	'/bootstrap',
	express.static(__dirname + '/node_modules/bootstrap/dist/')
);

const PORT = 3000;
app.listen(
	PORT,
	console.log('Servidor escuchando en http://localhost:' + PORT)
);

// RUTAS
app.get(['/', '/home'], async(req, res) => {
    let data = await leerAnime()
	res.render('home',{
        animes: data.animes
    });
});
app.get('/animes', async (req, res) => {
	let animes = await leerAnime();
	res.send(animes);
});
app.get('/create', (req, res) => {
	res.render('createAnime');
});
app.get('/actualizar/:id',async(req,res)=>{
    const {id} = req.params;
    let data = await leerAnime();
    let found = data.animes.find(anime=>anime.id == id);
    res.render('actualizar', {
        anime: found,
    })
})

app.put('/actualizar/:id', async(req,res)=>{
	try {
		let {id} = req.params;
		let { nombre, genero, year, autor } = req.body;
		let respuesta = await actualizarAnime(id,nombre, genero,year, autor)

		res.status(200).send({code:200, message: respuesta})
	} catch (error) {
		console.log(error);
		res.status(500).send({code:500, message: 'Error al intentar actualizar el anime'})
	}
})

app.post('/create', async (req, res) => {
	try {
		let { nombre, genero, year, autor } = req.body;
		let respuesta = await agregarAnime(nombre, genero, year, autor);
		res.status(201).send({ code: 201, message: respuesta });
	} catch (error) {
		console.log(error);
		res.status(500).send({
			code: 500,
			message: 'Error al guardar usuario en la bd',
		});
	}
});
