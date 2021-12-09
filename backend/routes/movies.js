var express = require('express');
var router = express.Router();
var movies = require('../movies');

router.get('/movies',  (req, res, next) => {
  res.send('[{afaf:bb}]')
});

router.get('/test',  (req, res, next) => {
    res.send('테스트입니다.')
  });
  

module.exports = router;