const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const { it } = require('node:test');

chai.use(chaiHttp);
// describe('Test ruta GET raiz /', () => {
// 	it('Ruta raiz recibe codigo 200', () => {
// 		let respuesta = chai.request(app).get('/');
// 		respuesta.end((error, resp) => {
// 			chai.assert.equal(resp.status, 200, 'Codigo de estado no coincide');
// 		});
// 	});
// 	app.close();
// });
// describe('Test ruta POST /animes/new', () => {
// 	it('Ruta recibe codigo 201', () => {
// 		let respuesta = chai.request(app).post('/animes/new');
// 		respuesta.end((error, resp) => {
// 			chai.assert.equal(resp.status, 201, 'No coincide con codigo 201');
// 		});
// 	});
// 	app.close();
// });
describe('Test ruta GET not found', () => {
	// it('Comprueba que ruta no existente reciba codigo 404', () => {
	// 	let respuesta = chai.request(app).get('/noexiste');
	// 	respuesta.end((error, resp) => {
	// 		chai.assert.equal(resp.status, 404, 'Codigo no coincide con 404');
	// 	});
	// });
	// it('Comprueba que mensaje recibido en ruta no existente sea "Ruta no encontrada"', () => {
	// 	let respuesta = chai.request(app).get('/noexiste');
	// 	respuesta.end((error, resp) => {
	// 		chai.assert.equal(resp.text, 'Ruta no encontrada', 'No hay respuesta');
	// 	});
	// });
	// app.close();
});
describe('Prueba', () => {
	let servidor;
	before(() => {
		servidor = app.listen(3001);
	});
	after(() => {
		servidor.close();
	});

	it('prueba 1', () => {
		chai
			.request(servidor)
			.get('/noexiste')
			.end((error, resp) => {
				chai.assert.equal(resp.status, 404, 'Codigo no coincide con 404');
				done();
			});
	});
});
