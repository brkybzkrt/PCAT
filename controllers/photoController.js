const fs = require('fs');
const Photo = require('../models/Photo');

exports.getPhotos = async (req, res) => {
  let page = req.query.page || 1;
  let perPage = 1;

  const photosCount= await Photo.find().countDocuments();

  const photos = await Photo.find().sort({ created_date: -1 }).skip((page-1)* perPage).limit(perPage);

  
  res.render('index', { 
    photos:photos,
    currentPage:page,
    allPages:Math.ceil(photosCount/perPage)

  });
};

exports.getPhoto = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);

  res.render('imagePage', { photo });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: `/uploads/${uploadedImage.name}`,
    });
    res.redirect('/');
  });
};



exports.updatePhoto = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const photo = await Photo.findById(id);
  photo.title = title;
  photo.description = description;
  photo.save();

  res.redirect(`/photo/${id}`);
};

exports.deletePhoto = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);
  fs.unlinkSync( __dirname+'/../public' + photo.image);
  
  await Photo.findByIdAndRemove(id);

  res.redirect('/');
};


