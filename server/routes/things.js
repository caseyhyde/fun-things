const express = require('express');
const app = express();
const router = express.Router();
// var random = require('./middleware/getThings');
var random = require('./middleware/random');





router.get('/', function(req, res) {
  app.use(random);
})
router.post('/')
//function to randomize array

module.exports = router;
