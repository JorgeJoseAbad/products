var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ironhack recommended products' });
});

router.get('/working', function(req, res, next) {
  res.render('working');
});

module.exports = router;
