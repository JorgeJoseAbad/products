/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ReviewSchema = new Schema({
  content: String,
  stars: Number,
  author: String
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review; 
