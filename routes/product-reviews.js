/*jshint esversion: 6*/
const express = require('express');
const Product = require('../models/product');
const Review  = require('../models/review');

const router  = express.Router();

router.get('/products/:productId/reviews/new', (req, res, next) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('product-reviews/new', { product: product });
  });
});

router.post('/products/:productId/reviews', (req, res, next) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return next(err);
    //create a new instance of Review
    const newReview = new Review({
      content: req.body.content,
      stars: req.body.stars,
      author: req.body.author
    });

    //and push it in product.reviews array
    product.reviews.push(newReview);

    product.save((err) => {
      res.redirect(`/products/${product._id}`);
    });
  });

});

router.post('/products/:productId/reviews/:reviewId/delete',(req,res,next) => {
   const idProduct = req.params.productId;
   const idReview  = req.params.reviewId;
   console.log(idProduct,idReview);

  Product.findById(idProduct,(err, product) => {
    if (err) return next(err);

    let index = product.reviews.findIndex((elem) => {
       elem._id = idReview;
    })
    product.reviews.splice(index,1);

    product.save((err) => {
      res.redirect(`/products/${product._id}`);
    });
  })

})

module.exports = router;
