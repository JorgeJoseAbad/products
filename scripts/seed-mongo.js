/*jshint esversion: 6*/
const products = [
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];

// bin/seeds.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironhack-products');
const Product = require('../models/product');

// bin/seeds.js
Product.create(products, (err, docs) => {
  if (err) { throw err; }
  docs.forEach( (product) => {
    console.log(product.name);
  });
  mongoose.connection.close();
});
