const express = require('express');
const router = express.Router();

router.get('/', () => console.log("random get route hit"));

module.exports = router;
