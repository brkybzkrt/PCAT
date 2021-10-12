const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const fs = require('fs');

const Photo = require('./models/Photo');

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

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());


//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find().sort({ created_date: -1 });

  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('addPage');
});

app.get('/photo/:id', async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);

  res.render('imagePage', { photo });
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: `/uploads/${uploadedImage.name}`,
    });
    res.redirect('/');
  });
});

app.get('/photo/update/:id', async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);
  res.render('updatePage', { photo });
});

app.put('/photoUpdate/:id', async(req,res)=>{
  const id = req.params.id;
  const {title,description}= req.body;
  
  const photo = await Photo.findById(id)
  photo.title=title;
  photo.description=description;
  photo.save();

  res.redirect(`/photo/${id}`)
})

const port = 3000;

app.listen(port, () => {
  console.log(` Server started at port ${port}`);
});
