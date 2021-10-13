const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');


const photoController= require('./controllers/photoController');
const pageController= require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb://localhost/pcat', {
  usenewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

app.use(methodOverride('_method',{methods:['POST','GET']}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());


//routes
app.get('/',photoController.getPhotos);
app.post('/photos',photoController.createPhoto);
app.get('/photo/:id',photoController.getPhoto);
app.put('/photoUpdate/:id',photoController.updatePhoto)
app.delete('/photoDelete/:id',photoController.deletePhoto)


app.get('/about', pageController.getAboutPage);
app.get('/add',pageController.getAddPhotoPage);
app.get('/photo/update/:id',pageController.getPhotoUpdatePage);



const port = 3000;

app.listen(port, () => {
  console.log(` Server started at port ${port}`);
});
