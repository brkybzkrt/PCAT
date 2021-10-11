const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  created_date: { type: Date, default: Date.now },
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports=Photo;