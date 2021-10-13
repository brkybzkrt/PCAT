const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPhotoPage = (req, res) => {
  res.render('addPage');
};


exports.getPhotoUpdatePage = async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findById(id);
    res.render('updatePage', { photo });
  };