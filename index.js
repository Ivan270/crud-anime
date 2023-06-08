const express = require('express');

const app = express();
// const hbs = create({
// 	partialsDir: ['views/partials/'],
// });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', __dirname + '/views');

app.use(express.json());

// app.use(express.static('public'));
// app.use(
// 	'/bootstrap',
// 	express.static(__dirname + '/node_modules/bootstrap/dist/')
// );

const PORT = 3000;
app.listen(
	PORT,
	console.log('Servidor escuchando en http://localhost:' + PORT)
);

// RUTAS
app.get(['/', '/home'], (req, res) => {
	res.send('home');
});
