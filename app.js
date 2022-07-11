const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');

const app = express();

//CONNECT DB
mongoose.connect('mongodb://localhost/agency-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//ROUTES
app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/about', pageControllers.getAboutPage);
app.get('/clients', pageControllers.getClientsPage);
app.get('/services', pageControllers.getServicesPage);
app.get('/team', pageControllers.getTeamPage);
app.get('/contact', pageControllers.getContactPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port: ${port}`);
});
