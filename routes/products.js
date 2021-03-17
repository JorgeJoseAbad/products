/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();

const Products = require('../models/product');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Products.find({},function(err,products){
    if (err) return next(err);

    res.render('products/index',{products:products}); // va a la carpeta wiews a buscar el products.ejs
    //res.send(products)
  });
  //res.send('respond with a resource');
});

router.get('/new', function (req, res, next) {
  res.render('products/new-product', {
    title: 'Add a new product'
  });
});

router.post('/', function (req, res, next) {
  const body = req.body;
  const product = new Products(body);
  debugger;
  product.save(function (err, doc) {
    if (err) return next(err);
    res.redirect('/products');
  });
});

/*router.get('/product-details', (req, res, next) => {
  const productId = req.query.id;
  Products.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('products/show', { product: product });
  });
});
*/

router.get('/search', (req, res) => {
  let query = req.query.searchTerm;

  let queryRegex = new RegExp(query);
  // We use a Regex here to find items that are similar to the search
  // For instance if I searched "Yoga", I would then find the Yoga Mat
  Products.find({ name: queryRegex }, (err, products) => {
    if (err) { next(err); }
    res.render('products/search-results', {
      products:products,
      order: "search"
    });
  });
});

router.get('/cheapest', (req, res, next) => {
  Products
    .find({})
    .sort({ price: "ascending" })
    .exec((err, products) => {
      if (err) { next(err); }
      res.render('products/search-results',  {
        products:products,
        order:"cheapest first"
      });
    });
});

router.get('/expensive', (req, res, next) => {
  Products
    .find({})
    .sort({ price: "descending" })
    .exec((err, products) => {
      if (err) { next(err); }
      res.render('products/search-results',  {
        products,
        order:"Expensive first"
      });
    });
});

router.get('/:id', (req, res, next) => {
  const productId = req.params.id;
  Products.findById(productId, (err, product) => {
    if (err) { return next(err); }
    debugger;  //ojo quitar esto
    res.render('products/show', { product: product });
  });
});

router.get('/:id/edit',(req,res,next)=>{
  const productId = req.params.id;

  Products.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('products/edit', { product: product });
  });
  //res.send("estoy updateando"+req.params.id);
});

router.post('/:id', (req, res, next) => {
  const productId = req.params.id;
  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const updates = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };

  Products.findByIdAndUpdate(productId, updates, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/products');
  });
});

router.post('/:id/delete',(req,res,next)=>{
  const id = req.params.id;

  Products.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/products');
  });
});

module.exports = router;
