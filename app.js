const express = require('express');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
const ejs = require('ejs');

const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost/pcat', {
  usenewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find().sort({ created_date: -1 });

  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photo/:id', async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);

  res.render('imagePage', { photo });
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(` Server started at port ${port}`);
});
