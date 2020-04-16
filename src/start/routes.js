'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')
Route.get('/', 'MainController.index').as('index');
Route.get('/generate/:templateID', 'DocumentController.fill_template').as('fill_template');
Route.post('/generate/:templateID/pdf', 'DocumentController.pdf').as('pdf');

Route.get('/templates/:templateID', 'MainController.show_template').as('show_template');

Route.get('/documents/:file', 'MainController.serve_document');

Route.group(() => {
  Route.get('generated', 'MainController.generated');
}).prefix('test')
